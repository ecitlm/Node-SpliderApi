/*
 * @Author: ecitlm
 * @Date:   2017-12-01 08:57:07
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-05 21:20:18
 */

//音乐详情信息
const express = require('express');
const app = express();
const Server = require('../../../utils/httpServer');

app.get('/:hash', function(req, res) {
    var hash = req.params.hash;
    var host = 'm.kugou.com';
    var path = `/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`;
    var data = {};
    //false:http请求  true:https请求
    Server.httpGet(host, data, path, false)
        .then(function(body) {
            res.send({
                code: 200,
                data: JSON.parse(body),
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