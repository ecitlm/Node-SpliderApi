/* 
* @Author: ecitlm
* @Date:   2017-05-23 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-05-27 11:01:44
*/
const express = require('express')
const http    = require('http')
const cheerio = require("cheerio")
const app     = express()

function requests(req, res) {
    var req = req;
    var res = res;
    var catid=req.query.catid || 34;
    var page=req.query.page || 1;
    var options = {
        hostname: 'www.hbmeinv.com',
        port: 80,
        path: '/index.php?m=Content&c=Index&a=gengduolist&p='+page+'&catid='+catid,
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
            res.send(JSON.parse(body.toString()))

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