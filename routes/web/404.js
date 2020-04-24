/*
 * @Author: ecitlm
 * @Date:   2017-11-30 21:04:24
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:35:03
 */
'use strict'
const app = require('express')()
const ejs = require('ejs').__express
// 这里也可以配置识别HTML
app.engine('ejs', ejs) // 配置识别ejs模板
app.set('view engine', 'ejs') // 设置模板扩展名后缀自动添加
app.set('views', './views/web') // 设置模板路径

app.get('*', function (req, res) {
  res.render('404', {
    title: 'Nodejs_express'
  })
})
module.exports = app
