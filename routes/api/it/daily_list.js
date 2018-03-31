/*
 * @Author: ecitlm
 * @Date:   2017-12-01 21:02:46
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-03-31 20:23:42
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
    var url = 'http://caibaojian.com/c/news';
    console.log(url);

    request({
            url: url,
            encoding: null,
        },
        function(error, response, body) {
            var links = [];
            if (response && response.statusCode == 200) {
                var body = Iconv.decode(body, 'utf-8');
                $ = cheerio.load(body);
                $('#content article ').each(function() {
                    var title = $(this)
                        .find('.entry-title span')
                        .text();
                    var description = $(this)
                        .find('.entry-content p')
                        .text();
                    var href = $(this)
                        .find('.read-more')
                        .attr('href');
                    var date = $(this)
                        .find('.entry-date')
                        .text();
                    var tmp = {
                        title: title,
                        id: parseInt(title),
                        description: description,
                        date: date,
                        url: href,
                    };
                    links.push(tmp);
                });
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

app.get('/', function(req, res) {
    list(req, res);
});
module.exports = app;