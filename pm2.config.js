const path=require('path');

var isProd = process.env.NODE_ENV == 'production';
module.exports = {
    apps: [
        {
            name: "app",
            script: path.join(__dirname, "server.js"),
            autorestart: true,
            //log_type: "json",
            restart_delay:4000,
            watch: isProd ? false : ['server.js'],
            env: {
                cert: process.env.cert || `/app/certs/live/${process.env.DOMAIN}/fullchain.pem`,
                pkey: process.env.pkey || `/app/certs/live/${process.env.DOMAIN}/privkey.pem`
            },
            env_dev:{
                'NODE_ENV':'development'
            },
            env_prod:{
                'NODE_ENV':'production'
            }
        },
        {
            name: "http",
            script:  "./http.js",
            instances: 1,
            watch:['http.js'],
        }
    ],

    deploy: {}
};