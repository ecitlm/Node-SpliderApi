/*
 * @Author: ecitlm 
 * @Date: 2017-07-14 11:38:15 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-07-19 17:14:50
 */

//排行榜下的音乐列表
const express = require('express')
const app = express()
const Server = require('../untils/httpServer.js')

app.get('/', function(req, res) {
    var rankid = req.query.rankid;
    if (!rankid) {
        res.send({
            msg: "rankid参数为必填",
            code: 0
        })
    }
    var host = "m.kugou.com";
    var path = `/rank/info/${rankid}&json=true`;
    var data = req.params
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