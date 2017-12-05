/*
 * @Author: ecitlm
 * @Date:   2017-12-01 22:00:20
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-05 21:20:26
 */

const express = require('express');
const app = express();
const Server = require('../../../utils/httpServer');
const async = require('async');
const fs = require('fs');
const request = require('request');

function MathRand() {
    var Num = '';
    for (var i = 0; i < 8; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}

app.get('/', function(req, res) {
    var host = 'huaban.com';
    var random = MathRand();
    console.log(MathRand());
    var path = `/favorite/beauty?jao0fn1x&max=11${random}&limit=30&wfl=1`;
    var data = {};
    //false:http请求  true:https请求
    Server.ajaxGet(host, data, path, false)
        .then(function(body) {
            var list = JSON.parse(body)['pins'];
            var arr = [];
            for (var i in list) {
                arr.push({
                    url: 'http://img.hb.aicdn.com/' + list[i]['file']['key'],
                    file: list[i]['file']['key'],
                    title: list[i]['board']['title'],
                    desc: list[i]['board']['description'],
                    like: list[i]['like_count'],
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