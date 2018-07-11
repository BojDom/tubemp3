'use strict';

require('dotenv').config({path:'../.env'});
const  { exec , execFile } = require('child_process'),
  {inspect} =require('util'),
  LE = require('greenlock'),
  path = require('path'),
  scClient = require('socketcluster-client'),
  jwt = require('jsonwebtoken'),
  boot = require('./nginx/boot');


// Storage Backend
var leStore = require('le-store-certbot').create({
  configDir: __dirname  +'/certs'                              // or /etc/letsencrypt or wherever
, debug: false
});

var domains = [ process.env.DOMAIN ]


// ACME Challenge Handlers
var leHttpChallenge = require('le-challenge-fs').create({
    webrootPath: __dirname ,                            // or template string such as
    debug: false                                            // '/srv/www/:hostname/.well-known/acme-challenge'
});

var express = require('express');
var app = express(); 

var sc = scClient.connect({
  host:'0.0.0.0:'+process.env.WSPORT,
  query: {t :jwt.sign({app:process.env.DOMAIN}, process.env.JWT_NGINX_KEY, {algorithm: 'HS512'})}
})

sc.on('connect', async () => {
  console.log('CONNECTED TO NGINX')
  await boot.http();
  sc.emit('nginxReload');
  await new Promise(res=>{setTimeout(res,500)})
  checkCerts(false)
});


async function checkCerts(isProd) {

  var le = LE.create({ 
    store: leStore,
    version: 'v02',
    server: isProd ? 'https://acme-v02.api.letsencrypt.org/directory' : 'https://acme-staging-v02.api.letsencrypt.org/directory' ,

    approveDomains: domains,
    email: 'admin@beapoker.pro' // CHANGE TO YOUR EMAIL
    ,
    agreeTos: true // set to tosUrl string (or true) to pre-approve (and skip agreeToTerms)
      ,
    challenges: {
      'http-01': leHttpChallenge // handles /.well-known/acme-challege keys and tokens
    },
    challengeType: 'http-01' // default to this challenge type
    ,
    debug: false
      //, log: function (debug) {console.log.apply(console, args);} // handles debug outputs
  });
  app.use('/', le.middleware());


  let results = await le.check({ domains });
      if (results){
          certDone(results)
          return;        
      }
      else   le.register({    domains: domains }).then(async results => {
          if (!results){  console.log(chalk.bgRed('NO RESULTS'))};

          if (!isProd) {          
            let dest= `rm -rf /app/certs/live/${process.env.DOMAIN}`;
            console.log('delete',dest);  exec(dest);
            await new Promise(res=>{setTimeout(res,500)})
            checkCerts(true)
          } else {
            certDone(results)
          }
        });
        
}
async function certDone(){
      await boot.ssl();
      await new Promise(res => setTimeout(res, 500));
      sc.emit('nginxReload');
      await new Promise(res => setTimeout(res, 500));
      exec(`pm2 start pm2.config.js --only app --env ${process.env.DOMAIN.startsWith('d.') ? 'dev' : 'prod'}`, (err, stdout, sterr) => {})
      /*execFile('/app/nginx/mongocert.sh',['/app/certs/live/'+ process.env.DOMAIN+'/'],(err,stdout,sterr)=>{
              console.log(err,stdout,sterr)
      })*/
}
app.get('/hc',(req,res)=>{
  console.log(inspect(req.headers))
  res.send('okkK')
})
app.get('/', (req,res,next)=>{ 
    res.redirect('https://'+req.host)
});
var listen = app.listen(process.env.HTTP_PORT, ()=>{
  console.log('listening on ',process.env.HTTP_PORT)
} )


// Check in-memory cache of certificates for the named domain
