const express = require('express')
const http = require('http')
var cheerio = require("cheerio")
const app = express()
var request = require("request");
var mkdirp = require('mkdirp');
var async = require('async');
var Iconv = require('iconv-lite');


function view(req, res) {
    var res = res;
    var req = req;
    var id = req.params.id || 1;
    var url = 'http://www.meizitu.com/a/' + id + '.html';

    request({
        url: url,
        encoding: null
    }, function (error, response, body) {
        var links = [];
        console.log(response.statusCode);
        if (response.statusCode == 200) {
            var body = Iconv.decode(body, 'gb2312');
            $ = cheerio.load(body);
            $('#picture p img').each(function () {
                links.push($(this).attr('src'));
                console.log('-----------------------------------');
                console.log(links);
            });
            console.log(links);
            res.send({
                msg: "success",
                data: links,
                code: 1
            })
        } else {
            res.send({
                msg: "网络好像有，点问题",
                code: 0
            })
        }
    });

}


app.get('/:id/', function (req, res) {
    console.log(req.params.id);//输出index
    view(req, res)
});
module.exports = app;

