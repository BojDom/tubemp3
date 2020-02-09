const path = require('path');
console.log('DOMAIN',process.env.DOMAIN)

module.exports = {
	project: "tubemp3",
	title: "custom titleee",
	publicPath: "/dist/",
	static: 'dist/',

	root: path.join(__dirname),
	src: path.join(__dirname,'src'),
	indexSsr:  path.join(__dirname,'src/entry-server.js'),
	dev: {
		dist: path.join(__dirname, 'dev'),
		clientVars: {
			API_HOST: JSON.stringify('api.tubemp3.pro'),
			LOGO: "'https://"+process.env.DOMAIN+"/public/img/logo.jpg'",
			__THEME__: JSON.stringify('dev')
		}
	},
	prod: {
		dist: path.join(__dirname, 'dist'),
		clientVars: {
			API_HOST: JSON.stringify('api.tubemp3.pro'),
			LOGO: "'https://"+process.env.DOMAIN+"/public/img/logo.jpg'",
			__THEME__: JSON.stringify('default')
		}
	}
};