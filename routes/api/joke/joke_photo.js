/*
 * @Author: ecitlm
 * @Date:   2017-12-06 14:45:33
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-06 15:04:32
 */

const express = require('express');
const http = require('http');
const cheerio = require('cheerio');
const app = express();
const request = require('request');
const fs = require('fs');
const Iconv = require('iconv-lite');

function list(req, res) {
    var res = res;
    var req = req;
    var page = parseInt(req.params.page);
    var url = `http://www.xiaoliaoba.cn/page/tupian?page=${page}`;
    console.log(url)
    request({
            url: url,
            encoding: null,
        },
        function(error, response, body) {

            var links = [];
            if (response && response.statusCode == 200) {
                var body = Iconv.decode(body, 'utf-8');
                var $ = cheerio.load(body);
                $('.cont-item').each(function() {
                    var tmp = {
                        title: $(this).children(".cont-list-title").text(),
                        img: $(this).children(".cont-list-main").find("img").attr("data-src")
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
                    msg: '网络好像有，点问题',
                });
            }
        }
    );
}

app.get('/:page', function(req, res) {
    if (isNaN(req.params.page)) {
        res.send({
            msg: '请正确填写page参数 int类型',
            code: 2,
        });
        return false;
    }
    list(req, res);
});
module.exports = app;