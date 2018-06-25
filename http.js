'use strict';

const  { exec , execFile } = require('child_process'),
  LE = require('greenlock'),
  path = require('path'),
  ioClient = require('socket.io-client'),
  jwt = require('jsonwebtoken'),
  boot = require('./nginx/boot');


// Storage Backend
var leStore = require('le-store-certbot').create({
  configDir: __dirname  +'/certs'                              // or /etc/letsencrypt or wherever
, debug: false
});

var domains = [ process.env.DOMAIN ]

var io = ioClient.connect('http://0.0.0.0:'+process.env.WSPORT, {'query': 'token=' + jwt.sign({app:process.env.DOMAIN}, process.env.JWT_NGINX_KEY, {algorithm: 'HS512'})})
io.on('connect', async () => {
  console.log('CONNECTED TO NGINX')

});
// ACME Challenge Handlers
var leHttpChallenge = require('le-challenge-fs').create({
    webrootPath: __dirname ,                            // or template string such as
    debug: false                                            // '/srv/www/:hostname/.well-known/acme-challenge'
});

var express = require('express');
var app = express(); 


  boot.http();
  io.emit('nginxReload');


app.get('/cert', async (req, res,next) => {


  let isProd = req.query.p;


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
          console.log('RESULTS', results)
          if (!results)  {res.send('certs error');return;}

          if (!isProd) {
            res.send('certs done'+results._expiresAt);
            
            let dest= `rm -rf /app/certs/live/${process.env.DOMAIN}`;
            console.log('delete',dest);  exec(dest);
          } else {

            certDone(results)
          }
        });
        


async function certDone(results){
      await boot.ssl();
      await new Promise(res => setTimeout(res, 500));
      io.emit('nginxReload');
      await new Promise(res => setTimeout(res, 500));
      exec(`pm2 start pm2.config.js --only app --env ${process.env.DOMAIN.startsWith('d.') ? 'dev' : 'prod'}`, (err, stdout, sterr) => {})

       res.send( results ? results._expiresAt : 'okk') ;
}
})

app.get('/hc',(req,res)=>{
  res.send('okK')
})
app.get('/', (req,res,next)=>{ 
    res.redirect('https://'+req.host)
});
var listen = app.listen(process.env.HTTP_PORT, ()=>{
  console.log('listening on ',process.env.HTTP_PORT)
} )


// Check in-memory cache of certificates for the named domain
