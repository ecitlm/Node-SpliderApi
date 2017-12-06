/*
 * @Author: ecitlm
 * @Date:   2017-12-01 21:30:50
 * @Last Modified by:   ecitlm
 * @Last Modified time: 2017-12-06 16:13:59
 */
 const express = require('express');
 const app = express();
 const Server = require('../../../utils/httpServer');
 
 app.get('/:page', function(req, res) {
    var page = req.params.page;
    var host = '3g.163.com';
    var path = `/touch/jsonp/joke/chanListNews/T141931628472/2/${page}-20.html`;
    var data = {};
    //false:http请求  true:https请求
    Server.httpGet(host, data, path, false)
    .then(function(body) {
        var list = JSON.parse(body)['段子'];
        var arr = [];
        for (var i in list) {
            arr.push({
                title: list[i].title,
                source: list[i].source,
                digest: list[i].digest,
            });
        }

        res.send({
            code: 200,
            data: arr,
            msg: '',
        });
    })
    .catch(function(err) {
        res.send({
            code: 404,
            msg: '网络好像有点问题',
        });
        console.log(err);
    });
});

 module.exports = app;