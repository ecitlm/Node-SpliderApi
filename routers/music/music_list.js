/*
 * @Author: ecitlm 
 * @Date: 2017-05-27 22:53:50 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-06-14 20:18:51
 */
const express = require('express')
const http    = require('http')
const cheerio = require("cheerio")
const app     = express()
const Server = require('../untils/httpServer.js')

app.get('/', function (req, res) {
    var host = "mobilecdn.kugou.com";
    var path = "/api/v3/search/song?format=json&keyword=%E8%96%9B%E4%B9%8B%E8%B0%A6&page=3&pagesize=30&showtype=1";
    var data = req.params
    //false:http请求  true:https请求
    Server.httpGet(host, data, path, false).then(function (body) {
         res.send(body);

    }).catch(function (err) {
         res.send({
            msg: "糟糕!!! 网络好像有点问题",
            code: 0
        })
        console.log(err)
    })
});

module.exports = app;