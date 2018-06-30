/*
 * @Author: ecitlm
 * @Date: 2017-12-08 09:58:39
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-30 17:23:18
 */
'use strict'
let express = require('express')
let app = express()
let ejs = require('ejs')
const myajax = require('../../utils/fetch')
// 这里也可以配置识别HTML
app.engine('ejs', ejs.__express) // 配置识别ejs模板
app.set('view engine', 'ejs') // 设置模板扩展名后缀自动添加
app.set('views', './views/web') // 设置模板路径
app.get('/', function (req, res) {
  let page = Math.floor(Math.random() * 380)
  myajax
    .get('/api/jandan/' + page, {})
    .then(function (response) {
      res.render('jandan', {
        data: response['data']
      })
    })
    .catch(function (err) {
      console.log(err)
    })
})

module.exports = app
