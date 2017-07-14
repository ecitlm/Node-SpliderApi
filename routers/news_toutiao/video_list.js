/* 
 * @Author: ecitlm
 * @Date:   2017-05-23 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-07-06 10:56:24
 */
const express = require('express')
const http = require('http')
const app = express()
const Server = require('../untils/httpServer.js')
app.get('/', function(req, res) {

    var id;
    var type = parseInt(req.query.type) || 0;
    var page = parseInt(req.query.page) || 0
        // 0搞笑视频  1美女视频  2体育视频  3 新闻现场 4涨姿势  5猎奇  6 黑科技 默认搞笑视频
    switch (type) {
        case 0:
            id = "VAP4BFE3U"
            break;
        case 1:
            id = "VAP4BG6DL"
            break;
        case 2:
            id = "VBF8F2E94"
            break;
        case 3:
            id = "VAV3H6JSN"
            break;
        case 4:
            id = "VBF8F3SGL"
            break;
        case 5:
            id = "VBF8ET3S2"
            break;
        case 5:
            id = "VBF8F2PKF"
            break;
        default:
            id = "VAP4BFE3U";
    }

    var host = "c.m.163.com";
    var path = `/nc/video/list/${id}/y/${page}-10.html`;
    var data = {}
        //false:http请求  true:https请求
    console.log(path)
    Server.httpGet(host, data, path, false).then(function(body) {
        res.send({
            msg: "success",
            code: 1,
            data: JSON.parse(body)[id]
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