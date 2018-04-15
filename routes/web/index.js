/*
 * @Author: ecitlm
 * @Date:   2017-11-30 21:04:24
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:35:03
 */
let express = require('express')
let app = express()
let ejs = require('ejs')

// 这里也可以配置识别HTML
app.engine('ejs', ejs.__express) // 配置识别ejs模板
app.set('view engine', 'ejs') // 设置模板扩展名后缀自动添加
app.set('views', './views/web') // 设置模板路径

app.get('/', function (req, res) {
  // res.header("Content-Type:text/html; charset=utf-8");
  res.render('index', {
    title: '欢迎进入IT开发者--Nodejs+express'
  })
})

module.exports = app
