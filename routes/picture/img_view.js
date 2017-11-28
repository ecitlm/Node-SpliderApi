/* 
 * @Author: ecitlm
 * @Date:   2017-05-23 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-11-28 17:43:34
 */
const express = require('express')
const http = require('http')
const cheerio = require("cheerio")
const app = express()
const request = require("request");
const Iconv = require('iconv-lite');


function view(req, res) {
    var res = res;
    var req = req;
    var id = req.query.id || 1;
    var url = `http://www.meizitu.com/a/${id}.html`;
    request({
        url: url,
        encoding: null
    }, function(error, response, body) {
        var links = [];
        if (response && response.statusCode == 200) {
            var body = Iconv.decode(body, 'gb2312');
            $ = cheerio.load(body);
            $('#picture p img').each(function() {
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


app.get('/', function(req, res) {
    console.log(req.query.id); //输出index
    view(req, res)
});
module.exports = app;