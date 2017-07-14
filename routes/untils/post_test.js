const express = require('express')
const app = express()
const Server = require('./httpServer.js')
const querystring = require("querystring");

app.get('/:page', function(req, res) {
    var host = "192.168.1.2";
    var path = "/?service=Index.query&";
    var data = req.params
        //false:http请求  true:https请求

    Server.httpPost(host, data, path, false).then(function(body) {
        res.send(JSON.parse(body));

    }).catch(function(err) {
        console.log(err)
    })
});

module.exports = app;