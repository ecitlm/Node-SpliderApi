/* 
* @Author: ecitlm
* @Date:   2017-05-23 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-05-26 21:45:59
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
    var url = 'https://www.awesomes.cn/rank';
    console.log(url)
    var headers = {
        "Connection": "keep-alive",
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'
    }
    request({
        url: url,
        encoding: null,
        headers: headers,

    }, function (error, response, body) {
        if (response && response.statusCode == 200) {
            var body = Iconv.decode(body, 'utf-8');
            $ = cheerio.load(body);
            var link = []
            $('.list-group-item').each(function (i,v) {
                var index = $(this).find('.index').text();
                var thumb = $(this).find('.cover').attr('src') || $(this).find('.cover').attr('data-original') ;
                var title=$(this).find('h3').text();
                var description=$(this).find('p').text();
                var href = $(this).attr('href');
                var tmp = {
                    index: index,
                    thumb:thumb,
                    title:title,
                    description: description,
                    url: href
                };
                console.log("------------"+i+"-------------")
                if(i==20){
                    return false;
                }
                link.push(tmp);
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

