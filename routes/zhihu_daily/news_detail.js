/* 
* @Author: ecitlm
* @Date:   2017-05-23 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-06-19 10:23:09
*/
const express = require('express')
const app = express()
const Server = require('../untils/httpServer.js')

app.get('/', function (req, res) {
    var id = req.query.id || 3977867;
    var host = "news-at.zhihu.com";
    var path = `/api/3/news/${id}`;
    var data = {}
    //false:http请求  true:https请求
    Server.httpGet(host, data, path, false).then(function (body) {
        res.send({
            msg: "success",
            code: 1,
            data: JSON.parse(body)
        })

    }).catch(function (err) {
        res.send({
            msg: "糟糕!!! 网络好像有点问题",
            code: 0
        })
        console.log(err)
    })
});

module.exports = app;