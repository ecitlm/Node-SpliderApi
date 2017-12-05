/*
 * @Author: ecitlm
 * @Date:   2017-12-01 09:34:53
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-05 21:19:50
 */

//排行榜下的音乐列表
const express = require('express');
const app = express();
const Server = require('../../../utils/httpServer');

app.get('/:rankid', function(req, res) {
    var rankid = req.params.rankid;
    var host = 'm.kugou.com';
    var path = `/rank/info/${rankid}&json=true`;
    var data = {};
    //false:http请求  true:https请求
    Server.httpGet(host, data, path, false)
        .then(function(body) {
            var body = JSON.parse(body);
            var result = {
                info: body['info'],
                songs: body['songs'],
                pagesize: body['pagesize'],
            };
            res.send({
                code: 200,
                data: result,
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