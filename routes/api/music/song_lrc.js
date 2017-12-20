/*
 * @Author: ecitlm
 * @Date:   2017-12-01 10:20:57
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-19 14:52:23
 */

const express = require('express');
const app = express();
const Server = require('../../../utils/httpServer');

//获取音乐歌词
app.get('/:hash', function(req, res) {
    var hash = req.params.hash;
    var host = 'm.kugou.com';
    var path = `/app/i/krc.php?cmd=100&hash=${hash}&timelength=3012000`;
    var data = {};
    //false:http请求  true:https请求
    Server.httpGet(host, data, path, false)
        .then(function(body) {
            res.send({
                code: 200,
                data: body,
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