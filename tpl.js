const path = require('path');
module.exports = {
	project: "tubemp3",
	title: "custom titleee",
	publicPath: "/dist/",
	static: '/dist/',
	dev: {
		dist: path.join(__dirname, 'dev'),
		clientVars: {
			API_HOST: JSON.stringify('apidev.tubemp3.co'),
			LOGO: "'https://tubemp3.co/public/img/logo.jpg'",
			__THEME__: JSON.stringify('dev')
		}
	},
	prod: {
		dist: path.join(__dirname, 'dist'),
		clientVars: {
			API_HOST: JSON.stringify('api.tubemp3.co'),
			LOGO: "'https://tubemp3.co/public/img/logo.jpg'",
			__THEME__: JSON.stringify('default')
		}
	}
};