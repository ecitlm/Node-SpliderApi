/* 
 * @Author: ecitlm
 * @Date:   2017-05-23 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-11-30 21:59:41
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
    var page = parseInt(req.query.page) || 1;
    var url = `http://www.meizitu.com/a/qingchun_3_${page}.html`;
    console.log(url)
    request({
        url: url,
        encoding: null
    }, function(error, response, body) {
        var links = [];
        if (response && response.statusCode == 200) {
            var body = Iconv.decode(body, 'gb2312');
            $ = cheerio.load(body);
            $('.pic a img').each(function() {
                var tmp = {
                    img: ($(this).attr('src')).replace('mm.howkuai.com', 'mm.chinasareview.com'),
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

app.get('/', function(req, res) {
    if (isNaN(req.query.page)) {
        res.send({
            msg: "请正确填写page参数 int类型",
            code: 0,
        });
        return false;
    }
    list(req, res)
});
module.exports = app;