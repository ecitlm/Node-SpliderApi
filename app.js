/*
 * @Author: ecitlm
 * @Date: 2017-12-06 16:20:03
 * @Last Modified by: ecitlm
 * @Last Modified time: 2020-05-31 16:25:30
 */
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const router = express.Router()
const interceptor = require('./middlewares/interceptor')
// 设置静态资源地址
app.use('/public', express.static('public'))
app.use('/docs', express.static('docs'))
app.use(cookieParser())
const arrRoutes = require('./routers')
app.get('/favicon.ico', (req, res) => res.end())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('X-Powered-By', ' 3.2.1')
  //这里可以对应的做一些权限控制、请求拦截处理
  interceptor(req, res, next)
})
for (const route of arrRoutes) {
  app.use(route.path, require(route.component))
}
app.use(router)
app.listen(3001, () => {
  console.log('Web server started at port 3001!')
})
module.exports = app
