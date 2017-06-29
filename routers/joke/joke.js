/*
 * @Author: ecitlm 
 * @Date: 2017-06-29 16:29:26 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-06-29 17:11:37
 */

const express = require('express')
const app = express()
const Server = require('../untils/httpServer.js')

app.get('/', function(req, res) {

    var host = "api.laifudao.com";
    var path = `/open/xiaohua.json`;
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