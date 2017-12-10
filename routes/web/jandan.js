/*
 * @Author: ecitlm 
 * @Date: 2017-12-08 09:58:39 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-10 12:00:37
 */
'use strict'
var express = require('express')
var app = express()
var ejs = require('ejs')
const myajax = require('../../utils/axios_render')
    // 这里也可以配置识别HTML
app.engine('ejs', ejs.__express); // 配置识别ejs模板
app.set('view engine', 'ejs'); // 设置模板扩展名后缀自动添加
app.set('views', './views/web'); // 设置模板路径
app.get('/', function(req, res) {
    var page = Math.floor(Math.random() * 380)
    myajax
        .get('/api/jandan/' + page, {})
        .then(function(response) {
            res.render('jandan', {
                data: response['data']
            })
        })
        .catch(function(err) {
            console.log(err)
        })
})

module.exports = app