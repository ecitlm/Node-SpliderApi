/*
 * @Author: ecitlm 
 * @Date: 2018-02-02 09:26:23 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-02-02 09:33:23
 */

//音乐mv详情
const express = require('express');
const app = express();
const Server = require('../../../utils/httpServer');

app.get("/:MvHash", function(req, res) {
    var MvHash = req.params.MvHash;
    var host = "m.kugou.com";
    var path = `/app/i/mv.php?cmd=100&hash=${MvHash}&ismp3=1&ext=mp4`;
    http: var data = {};
    console.log(path);
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