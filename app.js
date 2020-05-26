/*
 * @Author: ecitlm
 * @Date: 2017-12-06 16:20:03
 * @Last Modified by: ecitlm
 * @Last Modified time: 2020-05-26 23:28:12
 */
const express = require('express')
const app = express()
const router = express.Router()
// 设置静态资源地址
app.use('/public', express.static('public'))
app.use('/docs', express.static('docs'))
const arrRoutes = require('./routers')
app.use(function (req, res, next) {
  //这里可以对应的做一些权限控制、请求拦截处理
  console.log(req)
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  next()
})
for (const route of arrRoutes) {
  app.use(route.path, require(route.component))
}
app.use(router)
app.listen(3001, () => {
  console.log('Web server started at port 3001!')
})
module.exports = app
