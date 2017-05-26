/* 
 * @Author: ecitlm
 * @Date:   2017-05-23 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-05-26 21:36:18
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
    var url = 'http://huaban.com/favorite/beauty/?j35kh6ld&max=1158330026&limit=20&wfl=1';
    console.log(url)
    request({
        url: url,
        encoding: null
    }, function (error, response, body) {
        var links = [];
        if (response && response.statusCode == 200) {
            $ = cheerio.load(body);
            console.log($("body").html())
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

