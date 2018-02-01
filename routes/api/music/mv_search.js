/*
 * @Author: ecitlm 
 * @Date: 2018-02-01 17:24:09 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-02-01 17:31:21
 */

//音乐mv
const express = require('express');
const app = express();
const Server = require('../../../utils/httpServer');

app.get("/:keyword", function(req, res) {
    var keyword = encodeURIComponent(req.params.keyword);
    var host = "mvsearch.kugou.com";
    var path = `/mv_search?keyword=${keyword}&page=1&pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0`;

    var data = {};
    console.log(path)
        //false:http请求  true:https请求
    Server.httpGet(host, data, path, false)
        .then(function(body) {
            res.send({
                code: 200,
                data: JSON.parse(body),
                msg: ""
            });
        })
        .catch(function(err) {
            res.send({
                code: 404,
                msg: "网络好像有点问题"
            });
            console.log(err);
        });
});

module.exports = app;