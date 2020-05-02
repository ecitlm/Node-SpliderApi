/*
 * @Author: ecitlm
 * @Date:   2017-12-02 13:13:49
 * @Last Modified by: ecitlm
 * @Last Modified time: 2019-02-02 15:59:39
 */
const app = require('express')()
const ejs = require('ejs').__express
const myajax = require('../../utils/fetch')
// 这里也可以配置识别HTML
app.engine('ejs', ejs) // 配置识别ejs模板
app.set('view engine', 'ejs') // 设置模板扩展名后缀自动添加
app.set('views', './views/web') // 设置模板路径
app.get('/', function (req, res) {
  myajax
    .get('/api/daily_list', {})
    .then(function (response) {
      res.render('daily_list', {
        title: 'blog',
        data: response.data || {}
      })
    })
    .catch(function (err) {
      console.log(err)
    })
})

module.exports = app
