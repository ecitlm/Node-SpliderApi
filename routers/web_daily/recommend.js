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
    var url = 'http://caibaojian.com/c/feature';
    console.log(url)

    request({
        url: url,
        encoding: null
    }, function (error, response, body) {
        var links = [];
        if (response && response.statusCode == 200) {
            var body = Iconv.decode(body, 'utf-8');
            $ = cheerio.load(body);
            $('#content article ').each(function () {
                var title = $(this).find('.entry-title span').text();
                var description = $(this).find('.entry-content p').text();
                var href = $(this).find('.read-more').attr('href');
                var date = $(this).find('.entry-date').text();
                var tmp = {
                    title: title,
                    description: description,
                    date: date,
                    url: href
                };
                links.push(tmp);
            });
            res.send({
                msg: "success",
                data: links,
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

