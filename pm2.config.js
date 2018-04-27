const path  = require('path'),
fs = require('fs');
  

var app = 
  [{
    "name": "tubemp3",
    "script": path.join(__dirname, 'server.js'),
    "instances": 1,
    "autorestart": true,
    "exec_mode": "cluster",
    "watch": false,
    "env": {
      "PORT": process.env.port || "9111",
      "cert": process.env.cert,
      "pkey": process.env.pkey,
    }
  },
    {
    "name": "http_tubemp3",
    "script": '/www/setup/http/index.js',
    "instances": 1,
    "autorestart": true,
    "watch": false,
    "env": {
      "HTTP_PORT": process.env.HTTP_PORT || "9110"
    }
  }]
module.exports = {

  apps : app,
  deploy : {}
}