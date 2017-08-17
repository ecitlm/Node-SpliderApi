/* 
* @Author: ecitlm
* @Date:   2017-05-23 17:59:30
 * @Last Modified by:   ecitlm
 * @Last Modified time: 2017-08-07 20:26:32
*/
const express = require('express')
const http    = require('http')
const cheerio = require("cheerio")
const app     = express()
const request = require("request");
const fs      = require('fs');
const Iconv   = require('iconv-lite');



function list(req, res) {
    var res = res;
    var req = req;
    var url = 'https://juejin.im/welcome/frontend';
    console.log(url)

    request({
        url: url,
        encoding: null
    }, function (error, response, body) {
        var links = [];
        if (response && response.statusCode == 200) {
            var body = Iconv.decode(body, 'utf-8');
            $ = cheerio.load(body);
            $('.entry-list>li').each(function () {
                var title = $(this).find('.info .title').text();
                var href = $(this).find('.entry-link').attr('href');
                var date = $(this).find('.meta-row .date span').text();
                var tmp = {
                    title: title,
                    date: date,
                    url: "https://juejin.im"+href
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

