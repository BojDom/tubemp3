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
            env_dev:{
                'NODE_ENV':'development'
            },
            env_prod:{
                'NODE_ENV':'production'
            }
        },
        {
            name: "http",
            script:  "./node_modules/myutils/http.js",
            watch:['http.js'],
            env_dev:{
                'NODE_ENV':'development'
            },
            env_prod:{
                'NODE_ENV':'production'
            }
        }
    ],

    deploy: {}
};