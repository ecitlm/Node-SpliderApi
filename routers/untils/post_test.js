const express = require('express')
const app = express()
const Server = require('./httpServer.js')
const querystring = require("querystring");

//http://192.168.1.2:8097/Public/?service=Index.index
app.get('/:page', function (req, res) {
    var host = "192.168.1.2";
    console.log(req.params)
    var path="/Public/?service=Index.query";
    var method = "POST"; //POST GET
    var data =req.params// querystring.stringify(req.params)
    //false:http请求  true:https请求
    Server.httpServer(host, path, method, data,false).then(function (body) {
        res.send(body);

    }).catch(function (err) {
        console.log(err)
    })
});

module.exports = app;
