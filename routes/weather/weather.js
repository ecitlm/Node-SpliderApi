/*
 * @Author: ecitlm 
 * @Date: 2017-07-20 10:06:22 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-07-20 17:17:24
 */
//天气预报

const express = require('express')
const app = express()
const Server = require('../untils/httpServer.js')

app.get('/', function(req, res) {
    var location = encodeURI(req.query.location);
    if (!req.query.location) {
        res.send({
            msg: "请填写 location 必选参数",
            code: 0
        })
        return false;
    }
    var host = "api.map.baidu.com";
    var path = `/telematics/v3/weather?location=${location}&output=json&ak=32da004455c52b48d84a3a484c0dbc99`;
    var data = {}
        //false:http请求  true:https请求
    console.log(data)
    Server.httpGet(host, data, path, false).then(function(body) {
        res.send(body)

    }).catch(function(err) {
        res.send({
            msg: "糟糕!!! 网络好像有点问题",
            code: 0
        })
        console.log(err)
    })
});

module.exports = app;