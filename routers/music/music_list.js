/*
 * @Author: ecitlm 
 * @Date: 2017-05-27 22:53:50 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-05-27 23:03:06
 */


const express = require('express')
const http    = require('http')
const cheerio = require("cheerio")
const app     = express()

function requests(req, res) {
    var req = req;
    var res = res;
   //var item_id=req.query.item_id || "6424603234748334594";

    var options = {
        hostname: 'mobilecdn.kugou.com',
        port: 80,
        path: '/api/v3/search/song?format=json&keyword=%E8%96%9B%E4%B9%8B%E8%B0%A6&page=3&pagesize=30&showtype=1',
        method: 'get',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36"
        }//伪造请求头
    };

    var httpRequest = http.request(options, function (response) {

        console.log(res.statusCode);
        var body="" ;
        //res.on方法监听数据返回这一过程，"data"参数表示数数据接收的过程中，数据是一点点返回回来的，这里的chunk代表着一条条数据  
        response.on("data", function (chunk) {
            body +=chunk;
            console.log("----------------success----------------")
        })

        response.on("end", function () {
            console.log('----------------------------end output data--------------------------');
            console.log(body)
            res.send(body);

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

app.get('/', function (req, res) {
    res.header("Content-Type", "application/json;charset=utf-8");
    requests(req, res)
});
module.exports = app;