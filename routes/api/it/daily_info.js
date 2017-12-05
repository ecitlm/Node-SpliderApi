/*
 * @Author: ecitlm
 * @Date:   2017-12-01 21:06:42
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-05 21:19:12
 */
const express = require('express');
const http = require('http');
const cheerio = require('cheerio');
const app = express();
const request = require('request');
const Iconv = require('iconv-lite');

function list(req, res) {
    var res = res;
    var req = req;
    var date = parseInt(req.params.date);
    var url = `http://caibaojian.com/fe-daily-${date}.html`;
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
                var link = {
                    title: $('.entry-title a').text(),
                    description: $('.fe-desc').text(),
                    links: [],
                };
                $('.feddaily-list li').each(function() {
                    var title = $(this)
                        .find('.fed-title a')
                        .text();
                    var description = $(this)
                        .find('.fed-con')
                        .text();
                    var href =
                        $(this)
                        .find('.tlink')
                        .attr('href') || '';
                    var tmp = {
                        title: title,
                        description: description,
                        url: href.split('url=')[1],
                    };
                    link.links.push(tmp);
                });
                res.send({
                    code: 200,
                    data: link,
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

app.get('/:date', function(req, res) {
    list(req, res);
});
module.exports = app;