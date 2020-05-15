/*
 * @Author: ecitlm
 * @Date:   2017-12-01 09:19:34
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:31:26
 */

// 音乐新歌榜
const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/', function (req, res) {
  const host = 'm.kugou.com'
  const path = '/?json=true'
  // false:http请求  true:https请求
  Server.httpGet(host, {}, path, false)
    .then(function (body) {
      res.send({
        code: 200,
        data: JSON.parse(body).data,
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
