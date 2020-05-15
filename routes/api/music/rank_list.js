/*
 * @Author: ecitlm
 * @Date:   2017-11-30 23:12:53
 * @Last Modified by: ecitlm
 * @Last Modified time: 2020-04-26 00:17:48
 */
// 音乐排行榜
const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/', function (req, res) {
  const host = 'm.kugou.com'
  const path = '/rank/list&json=true'
  // false:http请求  true:https请求
  Server.httpGet(host, {}, path, false)
    .then(function (body) {
      res.send({
        code: 200,
        data: JSON.parse(body).rank,
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
