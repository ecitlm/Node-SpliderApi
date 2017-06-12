const express = require('express')
const app = express()
const Server = require('./httpServer.js')
const querystring = require("querystring");

app.get('/:daily_id', function (req, res) {
    var host = "api.it919.cn";
    console.log(req.params)
    var path="/index.php/api/Web/every_daily_list";
    var method = "GET"; //POST GET
    var data = querystring.stringify(req.params)
    //false:http请求  true:https请求
    Server.httpServer(host, path, method, data,true).then(function (body) {
        res.send(body);

    }).catch(function (err) {
        console.log(err)
    })
});

module.exports = app;
