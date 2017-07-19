/*
 * @Author: ecitlm 
 * @Date: 2017-07-19 10:46:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-07-19 20:21:32
 */

//音乐歌单
const express = require('express')
const app = express()
const Server = require('../untils/httpServer.js')

app.get('/', function(req, res) {
    var host = "m.kugou.com";
    var path = "/plist/index&json=true";
    var data = {}
        //false:http请求  true:https请求
    Server.httpGet(host, data, path, false).then(function(body) {
        res.send(body);

    }).catch(function(err) {
        res.send({
            msg: "糟糕!!! 网络好像有点问题",
            code: 0
        })
        console.log(err)
    })
});

module.exports = app;