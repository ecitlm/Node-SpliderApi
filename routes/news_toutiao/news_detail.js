/* 
* @Author: ecitlm
* @Date:   2017-05-23 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-06-15 21:14:50
*/
const express = require('express')
const app = express()
const Server = require('../untils/httpServer.js')

app.get('/', function (req, res) {
    var item_id = req.query.item_id || "6424603234748334594";
    var host = "m.toutiao.com";
    var path = `/i${item_id}/info/`;
    var data = {}
    //false:http请求  true:https请求
    console.log(path)
    Server.httpGet(host, data, path, false).then(function (body) {
        res.send({
            msg: "success",
            code: 1,
            data:JSON.parse(body)
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