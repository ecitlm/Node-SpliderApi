/* 
 * @Author: ecitlm
 * @Date:   2017-05-23 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-07-19 18:15:00
 */
const express = require('express')
const http = require('http')
const cheerio = require("cheerio")
const app = express()
const request = require("request");
const fs = require('fs');
const Iconv = require('iconv-lite');


function list(req, res) {
    var res = res;
    var req = req;
    var date = parseInt(req.query.date) || 20170522;
    var url = `http://caibaojian.com/fe-daily-${date}.html`;
    var headers = {
        "Connection": "keep-alive",
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'
    }
    request({
        url: url,
        encoding: null,
        headers: headers,

    }, function(error, response, body) {
        if (response && response.statusCode == 200) {
            var body = Iconv.decode(body, 'utf-8');
            $ = cheerio.load(body);
            var link = {
                title: $('.entry-title a').text(),
                description: $('.fe-desc').text(),
                links: []
            };
            $('.feddaily-list li').each(function() {
                var title = $(this).find('.fed-title a').text();
                var description = $(this).find('.fed-con').text();
                var href = $(this).find('.tlink').attr('href') || ""
                var tmp = {
                    title: title,
                    description: description,
                    url: href.split('url=')[1]
                };
                link.links.push(tmp);
            });
            res.send({
                msg: "success",
                data: link,
                code: 1
            });
        } else {
            res.send({
                msg: "糟糕!!! 网络好像有点问题",
                code: 0
            })
        }
    });

}

app.get('/', function(req, res) {
    list(req, res)
});
module.exports = app;