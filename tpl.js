const path = require('path');
console.log('DOMAIN',process.env.DOMAIN)

module.exports = {
	project: "tubemp3",
	title: "custom titleee",
	publicPath: "/dist/",
	static: 'dist/',
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