/*
 * @Author: ecitlm
 * @Last Modified by: ecitlm
 * @Last Modified time: 2020-05-31 17:37:08
 */
'use strict'
const app = require('express')()
const md5 = require('md5')
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/', function (req, res) {
  let params = req.body
  // 这里还与数据库交互
  if (params.name === 'ecitlm' && params.pwd === '123456') {
    console.log('login success ')
    res.cookie('token', md5(params.name), {
      maxAge: 1000 * 30 * 60,
      httpOnly: true
    })
    res.send({
      code: 200,
      msg: 'success'
    })
  } else {
    res.send({
      code: 201,
      msg: '用户名或密码错误'
    })
  }
})
module.exports = app
