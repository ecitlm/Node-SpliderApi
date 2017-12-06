/*
 * @Author: ecitlm
 * @Date:   2017-11-30 22:40:46
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-06 17:34:50
 */
const express = require('express');
const http = require('http');
const cheerio = require('cheerio');
const app = express();
const request = require('request');
const fs = require('fs');
const Iconv = require('iconv-lite');

function regx(str) {
    const reg = /\/([^\/]+)\.html/;
    if (reg.test(str)) {
        return RegExp.$1;
    }
}

function list(req, res) {
    console.log('photo_type');
    var res = res;
    var req = req;
    var url = 'http://www.meizitu.com/';
    console.log(url);
    request({
            url: url,
            encoding: null,
        },
        function(error, response, body) {
            var links = [];
            if (response && response.statusCode == 200) {
                var body = Iconv.decode(body, 'gb2312');
                $ = cheerio.load(body);

                $('.tags a').each(function() {
                    var tmp = {
                        title: $(this).text(),
                        id: regx($(this).attr('href')),
                    };
                    links.push(tmp);
                });
                console.log(links);
                res.send({
                    code: 200,
                    data: links,
                    msg: '',
                });
            } else {
                res.send({
                    code: 404,
                    msg: '网络好像有点问题',
                });
            }
        }
    );
}

app.get('/', function(req, res) {
    list(req, res);
});
module.exports = app;