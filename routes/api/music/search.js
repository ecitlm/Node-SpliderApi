/*
 * @Author: ecitlm
 * @Date:   2017-12-01 10:29:20
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-05 21:20:04
 */

const express = require('express');
const app = express();
const Server = require('../../../utils/httpServer');

//音乐搜索
app.get('/:keyword', function(req, res) {
    var keyword = encodeURIComponent(req.params.keyword);
    console.log();
    var host = 'mobilecdn.kugou.com';
    var path = `/api/v3/search/song?format=json&keyword=${
    keyword
  }&page=1&pagesize=20&showtype=1`;
    var data = {};
    //false:http请求  true:https请求
    Server.httpGet(host, data, path, false)
        .then(function(body) {
            res.send({
                code: 200,
                data: JSON.parse(body)['data'],
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