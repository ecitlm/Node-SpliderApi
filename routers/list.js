const express = require('express')
const http = require('http')
var cheerio = require("cheerio")
const app = express()
var request = require("request");
var mkdirp = require('mkdirp');
var async = require('async');
var fs = require('fs');
var Iconv = require('iconv-lite');


function list(req, res) {
    var res = res;
    var req = req;
    var page = req.params.page || 1;
    //var url = 'http://www.meizitu.com/a/list_1_' + page + '.html';
    var url='http://www.meizitu.com/a/qingchun_3_'+page+'.html'

    request({
        url: url,
        encoding: null
    }, function (error, response, body) {
        var links = [];
        console.log(response.statusCode);
        if (response.statusCode == 200) {
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
            //console.log(links);
            res.send({
                msg: "success",
                data: links,
                code: 1
            })
        } else {
            res.send({
                msg: "糟糕!!!网络好像有，点问题",
                code: 0
            })
        }
    });

}


app.get('/:page/', function (req, res) {
    list(req, res)


});
module.exports = app;

