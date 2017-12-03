/*
 * @Author: ecitlm
 * @Date:   2017-12-02 13:13:49
 * @Last Modified by:   ecitlm
 * @Last Modified time: 2017-12-03 20:58:15
 */
var express = require('express');
var app = express();
var ejs = require('ejs');
//这里也可以配置识别HTML
app.engine('ejs', ejs.__express); //配置识别ejs模板
app.set('view engine', 'ejs'); //设置模板扩展名后缀自动添加
app.set('views', './views/web'); //设置模板路径

const myajax = require('../../utils/axios_render');



app.get('/', function(req, res) {
     myajax.ajax("/api/huaban",{}).then(function(response){
     	 res.render('daily_list', {
        title: 'blog',
        data:response['data']
    });
     }).catch(function(err){
     	console.log(err)
     })
   
});

module.exports = app;