/*
 * @Author: ecitlm
 * @Date:   2017-12-01 09:54:34
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:32:30
 */

const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')
// 歌手分类下面的某一类歌手
app.get('/:classid', function (req, res) {
  let classid = req.params.classid
  let host = 'm.kugou.com'
  let path = `/singer/list/${classid}&json=true`
  // false:http请求  true:https请求
  Server.httpGet(host, {}, path, false)
    .then(function (body) {
      body = JSON.parse(body)
      let result = {
        classname: body['classname'],
        classid: body['classid'],
        singers: body['singers']
      }
      res.send({
        code: 200,
        data: result,
        msg: ''
      })
    })
    .catch(function (err) {
      res.send({
        code: 404,
        msg: '网络好像有点问题'
      })
      console.log(err)
    })
})

module.exports = app
