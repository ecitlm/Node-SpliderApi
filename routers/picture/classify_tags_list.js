/* 
* @Author: ecitlm
* @Date:   2017-05-23 17:59:30
* @Last Modified by:   ecitlm
* @Last Modified time: 2017-05-25 18:00:37
*/
const express = require('express')
const http = require('http')
const cheerio = require("cheerio")
const app = express()
const request = require("request");
const fs = require('fs');
const Iconv = require('iconv-lite');


function list(req, res) {
    var res  = res;
    var req  = req;
    var tags = req.query.tags;
    var url  = 'http://www.meizitu.com/a/'+tags+'.html';
    console.log(url)
    request({
        url: url,
        encoding: null
    }, function (error, response, body) {
        var links = [];
        if (response && response.statusCode == 200) {
            var body = Iconv.decode(body, 'gb2312');
            $ = cheerio.load(body);
            $('.pic a img').each(function () {
                var tmp = {
                    img: $(this).attr('src'),
                    title: $(this).attr('alt'),
                    url: $(this).parent('a').attr('href'),
                    id: parseInt($(this).parent('a').attr('href').replace(/\D/g, ""))
                }
                links.push(tmp);
            });
            console.log('-----------------------------success-----------------------------');
            console.log(links)
            res.send({
                msg: "success",
                data: links,
                code: 1
            })
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

