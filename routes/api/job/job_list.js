/*
 * @Author: ecitlm 
 * @Date: 2017-12-07 14:57:40 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-07 15:24:58
 */
const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/:city/:positionName/:pageNo', function(req, res) {
    var city = encodeURIComponent(req.params.city)
    var positionName = encodeURIComponent(req.params.positionName)
    var pageNo = req.params.pageNo
    var host = 'm.lagou.com'
    var path = `/search.json?city=${city}&positionName=${positionName}&pageNo=${pageNo}&pageSize=15`
    var data = {}
        // false:http请求  true:https请求
    Server.httpGet(host, data, path, true)
        .then(function(body) {
            var list = JSON.parse(body)['content']['data']
            res.send({
                code: 200,
                data: list,
                msg: ''
            })
        })
        .catch(function(err) {
            res.send({
                code: 404,
                msg: '网络好像有点问题'
            })
            console.log(err)
        })
})

module.exports = app