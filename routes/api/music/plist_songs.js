/*
 * @Author: ecitlm
 * @Date:   2017-12-01 09:06:42
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-05 21:19:42
 */

//音乐歌单下的音乐列表
const express = require('express');
const app = express();
const Server = require('../../../utils/httpServer');

app.get('/:specialid', function(req, res) {
    var specialid = req.params.specialid;
    var host = 'm.kugou.com';
    var path = `/plist/list/${specialid}?json=true`;
    var data = {};
    //false:http请求  true:https请求
    Server.httpGet(host, data, path, false)
        .then(function(body) {
            res.send({
                code: 200,
                data: JSON.parse(body)['list'],
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