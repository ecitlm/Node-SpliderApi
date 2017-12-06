/* 
 * @Author: ecitlm
 * @Date:   2017-12-05 20:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-06 21:18:01
 */
const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer');

app.get('/:item_id', function(req, res) {
    var item_id = req.params.item_id || "6424603234748334594";
    var host = "m.toutiao.com";
    var path = `/i${item_id}/info/`;
    var data = {}
        //false:http请求  true:https请求
    console.log(path)
    Server.httpGet(host, data, path, false).then(function(body) {
        res.send({
            code: 200,
            data: JSON.parse(body)['data'],
            msg: '',
        })

    }).catch(function(err) {
        res.send({
            code: 404,
            msg: '网络好像有点问题',
        })
        console.log(err)
    })
});


module.exports = app;