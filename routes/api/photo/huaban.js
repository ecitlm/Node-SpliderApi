/*
 * @Author: ecitlm
 * @Date:   2017-12-01 22:00:20
 * @Last Modified by:   ecitlm
 * @Last Modified time: 2017-12-05 12:50:46
 */

const express = require('express');
const app = express();
const Server = require('../../../utils/httpServer');
const async = require('async')
const fs = require('fs')
const request = require('request')

function MathRand() {
    var Num = "";
    for (var i = 0; i < 8; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}


app.get('/', function(req, res) {
    var host = "huaban.com";
    var random = MathRand();
    console.log(MathRand())
    var path = `/favorite/beauty?jao0fn1x&max=11${random}&limit=50&wfl=1`;
    var data = {}
        //false:http请求  true:https请求
    Server.ajaxGet(host, data, path, false).then(function(body) {
        var list = JSON.parse(body)['pins'];
        console.log(list)
        var arr = [];
        for (var i in list) {
            arr.push({
                "url": "http://img.hb.aicdn.com/" + list[i]['file']['key'],
                "file": list[i]['file']['key'],
                "title": list[i]['board']['title'],
                'desc': list[i]['board']['description'],
                'like': list[i]['like_count']
            })
        }

        /*      var dir="C:/Users/Administrator/Desktop/imgs";
              async.mapSeries(arr, function(item, callback) {
                  console.log(item.url)
                  download(item.url, dir,  item.file+ ".png");
                  console.log("-------------正在下载图片-------------")
                  callback(null, item);
              }, function(err, results) {});*/

        res.send({
            code: 200,
            data: arr,
            msg: ""
        })
    }).catch(function(err) {
        res.send({
            code: 404,
            msg: "网络好像有点问题"
        })
        console.log(err)
    })
});

//文件下载
var download = function(url, dir, filename) {
    request.head(url, function(err, res, body) {
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};
module.exports = app;