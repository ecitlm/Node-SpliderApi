/*
 * @Author: ecitlm 
 * @Date: 2017-07-19 17:11:18 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-07-19 17:14:14
 */

//音乐详情信息
const express = require('express')
const app = express()
const Server = require('../untils/httpServer.js')

app.get('/', function(req, res) {
    var hash = req.query.hash || "CB7EE97F4CC11C4EA7A1FA4B516A5D97";
    var host = "m.kugou.com";
    var path = `/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`;
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