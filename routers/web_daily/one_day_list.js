const express = require('express')
const http = require('http')
var cheerio = require("cheerio")
const app = express()
var request = require("request");
var fs = require('fs');
var Iconv = require('iconv-lite');


function list(req, res) {
    var res = res;
    var req = req;
    var date = parseInt(req.query.date) || 20170522;
    var url = 'http://caibaojian.com/fe-daily-'+date+'.html';

    request({
        url: url,
        encoding: null
    }, function (error, response, body) {
        if (response && response.statusCode == 200) {
            var body = Iconv.decode(body, 'utf-8');
            $ = cheerio.load(body);
            var link = {
                title:$('.entry-title a').text(),
                description:$('.fe-desc').text(),
                links:[]
            };
            $('.feddaily-list li').each(function () {
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

app.get('/', function (req, res) {
        list(req, res)
});
module.exports = app;

