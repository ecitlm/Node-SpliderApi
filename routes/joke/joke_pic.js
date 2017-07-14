/*
 * @Author: ecitlm 
 * @Date: 2017-06-29 16:18:45 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-06-29 16:26:00
 */


const express = require('express')
const app = express()
const Server = require('../untils/httpServer.js')

app.get('/', function(req, res) {

    var host = "api.laifudao.com";
    var path = `/open/tupian.json`;
    var data = {}
        //false:http请求  true:https请求
    Server.httpGet(host, data, path, false).then(function(body) {
        res.send({
            msg: "success",
            code: 1,
            data: eval('(' + body + ')')
        })

    }).catch(function(err) {
        res.send({
            msg: "糟糕!!! 网络好像有点问题",
            code: 0
        })
        console.log(err)
    })
});

module.exports = app;