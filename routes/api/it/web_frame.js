/*
 * @Author: ecitlm
 * @Date:   2017-12-01 20:29:08
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-05 21:19:22
 */
const express = require('express');
const http = require('http');
const cheerio = require('cheerio');
const app = express();
const request = require('request');
const Iconv = require('iconv-lite');

/**
 * [list 抓取最新十天的前端日报]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function list(req, res) {
    var res = res;
    var req = req;
    var url = 'http://cdn.it919.cn/frame.html';
    var headers = {
        Connection: 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
    };
    request({
            url: url,
            encoding: null,
            headers: headers,
        },
        function(error, response, body) {
            if (response && response.statusCode == 200) {
                var body = Iconv.decode(body, 'utf-8');
                $ = cheerio.load(body);
                var link = [];
                $('.list-item').each(function(i, v) {
                    var index = $(this)
                        .find('.scord')
                        .text();
                    var thumb = $(this)
                        .find('.cover')
                        .attr('src');
                    var title = $(this)
                        .find('h4')
                        .text();
                    var description = $(this)
                        .find('.sdesc')
                        .text();
                    var href =
                        'https://github.com' +
                        $(this)
                        .find('a')
                        .attr('href');
                    var tmp = {
                        index: index,
                        thumb: thumb,
                        title: title,
                        description: description,
                        url: href.replace('/repo', ''),
                    };
                    link.push(tmp);
                });
                res.send({
                    code: 200,
                    data: link,
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