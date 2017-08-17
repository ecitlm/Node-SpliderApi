/*
 * @Author: ecitlm
 * @Date:   2017-05-23 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-07-19 10:16:35
 */
const express = require('express')
const http = require('http')
const cheerio = require("cheerio")
const app = express()
const request = require("request")
const Iconv = require('iconv-lite')


function list(req, res) {
    var res = res;
    var req = req;
    var page = parseInt(req.query.page) || 1;
    var url = `http://www.oschina.net/action/ajax/get_more_news_list?newsType=project&p=${page}`;
    var headers = {
        "Connection": "keep-alive",
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'
    }
    request({
        url: url,
        encoding: null,
        headers: headers,

    }, function(error, response, body) {
        if (response && response.statusCode == 200) {
            var body = Iconv.decode(body, 'utf-8');
            $ = cheerio.load(body);
            var link = [];
            $('.item').each(function() {
                var title = $(this).find('.title span').text();
                var description = $(this).find('.summary').text();
                var href = "http://www.oschina.net"+$(this).find('.title').attr('href') || "";
                var thumb= $(this).find('.small').attr("src") ?  "http://www.oschina.net"+$(this).find('.small').attr("src") : "";
                var date =$(this).find('.mr').eq(0).text().split("于")[1]

                var tmp = {
                    title: title,
                    description: description,
                    href: href,
                    thumb:thumb,
                    date:date
                };
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
app.get('/', function(req, res) {
    list(req, res)
});
module.exports = app;
