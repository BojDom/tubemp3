 const _ = require("lodash"),
 	path = require("path"),
 	fs = require("fs"),
 	{ 		inspect 	} = require('util'),
 	NginxConfFile = require('nginx-conf').NginxConfFile,
 	baseFile = path.join(__dirname, 'nginx.base'),
 	outFile = '/app/certs/nginx.conf',
 	chalk= require('chalk');


 module.exports.http = () => {

 NginxConfFile.create(baseFile, function(err, conf) {
	 	conf.die(baseFile)
	 	conf.nginx._add('upstream', process.env.DOMAIN);
	 	conf.nginx._add('upstream', 'http_' + process.env.DOMAIN);
	 	conf.nginx.upstream[0]._add('server', '0.0.0.0:' + process.env.SSL_PORT)
	 	conf.nginx.upstream[1]._add('server', '0.0.0.0:' + process.env.HTTP_PORT)
	 		//console.log(inspect(conf.nginx),process.env.DOMAIN);
	 	conf.nginx.server[0]._add('server_name', process.env.DOMAIN)
	 	conf.nginx.server[0].location[0]._add('proxy_pass', 'http://http_'+process.env.DOMAIN)
	 	conf.nginx.server[1].location[0]._add('proxy_pass', 'https://'+process.env.DOMAIN)
	 	conf.nginx.server[1]._add('server_name', process.env.DOMAIN)

	 	conf.live(outFile)
	 })
 	return Promise.resolve()
}

 module.exports.ssl = () => {
 	NginxConfFile.create(outFile, function(err, conf) {
 		conf.die(baseFile)
 		
 		let certsFolder =path.join(process.env.NGINX_FOLDER, process.env.DOMAIN, 'live',process.env.DOMAIN)
 		if (conf.nginx.server[1].ssl || !fs.existsSync(path.join('/app/certs/live',process.env.DOMAIN,  'fullchain.pem'))) {
 			console.log(chalk.bgRed('ssl gia ce o manca fullchain.pem'))
 			return;}
 		console.log(chalk.green('adding ssl to nginx.conf'))
 		conf.nginx.server[1]._add('ssl', 'on');
 		conf.nginx.server[1]._add('ssl_certificate',	path.join(certsFolder,'fullchain.pem'));
 		conf.nginx.server[1]._add('ssl_certificate_key', path.join(certsFolder , 'privkey.pem'))
 		conf.live(outFile)
 		 	return Promise.resolve()

 	})

 }
 module.exports.exists = ()=>{
 	return fs.existsSync(outFile)
 }