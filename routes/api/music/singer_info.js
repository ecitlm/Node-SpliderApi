/*
 * @Author: ecitlm
 * @Date:   2017-12-01 10:06:54
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-05 21:20:12
 */

const express = require('express');
const app = express();
const Server = require('../../../utils/httpServer');
//歌手详细信息
app.get('/:singerid', function(req, res) {
    var singerid = req.params.singerid;
    var host = 'm.kugou.com';
    var path = `/singer/info/${singerid}&json=true`;
    var data = {};
    //false:http请求  true:https请求
    Server.httpMobileGet(host, data, path, false)
        .then(function(body) {
            var body = JSON.parse(body);
            var result = {
                info: body['info'],
                songs: body['songs'],
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