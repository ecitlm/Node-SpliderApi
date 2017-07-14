/* 
 * @Author: ecitlm
 * @Date:   2017-05-23 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-06-19 15:48:27
 */
const express = require('express')
const cheerio = require("cheerio")
const app = express()
const Iconv = require('iconv-lite');
const Server = require('../untils/httpServer.js')


app.get('/', function(req, res) {
    var tags = req.query.tags;

    var host = "www.meizitu.com";
    var path = `/a/${tags}.html`;
    var data = {}
        //false:http请求  true:https请求
    console.log(path)
    Server.httpGet(host, data, path, false).then(function(body) {
        var body = Iconv.decode(body, 'gb2312');
        console.log(Iconv.decode(body, 'utf-8').toString());
        //$ = cheerio.load(body);
        $ = cheerio.load(body, { decodeEntities: false })
        var links = [];
        $('.pic a img').each(function() {
            var tmp = {
                img: $(this).attr('src'),
                //title: $(this).attr('alt'),
                url: $(this).parent('a').attr('href'),
                id: parseInt($(this).parent('a').attr('href').replace(/\D/g, ""))
            }
            links.push(tmp);
        });
        console.log('-----------------------------success-----------------------------');
        res.send({
            msg: "success",
            data: links,
            code: 1
        })

    }).catch(function(err) {
        res.send({
            msg: "糟糕!!! 网络好像有点问题",
            code: 0
        })
        console.log(err)
    })
});




app.get('/', function(req, res) {
    list(req, res)
});
module.exports = app;