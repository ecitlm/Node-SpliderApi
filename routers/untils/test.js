const express = require('express')
const app = express()
const Server= require('./httpServer.js')


app.get('/', function (req,res) {
    var host="api.it919.cn";
    var path="/index.php/api/Web/every_daily_list";
    var method="get";
    var data={
        'daily_id':20170601
    }
    //false:http请求  true:https请求
    Server.httpServer(host,path, method, data,true)
    .then(function(body){
         res.send({
                msg: "success",
                data: JSON.parse(body),
                code: 1
            });
    
    })
    .catch(function(err){
        console.log(err)
    })
});

module.exports = app;
