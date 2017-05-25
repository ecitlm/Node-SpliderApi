const express = require('express')
const http = require('http')
const cheerio = require("cheerio")
const app = express()

function requests(req,res) {
    var req=req;
    var res=res;
    var options = {
        hostname: 'caibaojian.com',
        port: 80,
        path: '/c/feature',
        method: 'get',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36"
        }//伪造请求头
    };

    var httpRequest = http.request(options, function (response) {

        console.log(res.statusCode);
        var links = [];
        var body;
        //res.on方法监听数据返回这一过程，"data"参数表示数数据接收的过程中，数据是一点点返回回来的，这里的chunk代表着一条条数据  
        response.on("data", function (chunk) {
            body += chunk;
            console.log("----------------success----------------")
        })

        response.on("end", function () {
            console.log('----------------------------end output data--------------------------');
            $ = cheerio.load(body.toString());
            $('#content article ').each(function () {
                var title = $(this).find('.entry-title span').text();
                var description = $(this).find('.entry-content p').text();
                var href = $(this).find('.read-more').attr('href');
                var date = $(this).find('.entry-date').text();
                var tmp = {
                    title: title,
                    description: description,
                    date: date,
                    url: href
                };
                links.push(tmp);
            });
            res.send({
                msg: "success",
                data: links,
                code: 1
            });

        })
    })

    httpRequest.on("error", function () {
        res.send({
            msg: "糟糕!!! 网络好像有点问题",
            code: 0
        })
    })
    httpRequest.end(); //必须要要写，
}

app.get('/', function (req,res) {
    requests(req,res)
});
module.exports = app;