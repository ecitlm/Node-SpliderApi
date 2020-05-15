/*
 * @Author: ecitlm
 * @Date:   2017-12-01 10:06:54
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:32:10
 */

const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')
// 歌手详细信息
app.get('/:singerid', function (req, res) {
  const singerid = req.params.singerid
  const host = 'm.kugou.com'
  const path = `/singer/info/${singerid}&json=true`
  // false:http请求  true:https请求
  Server.httpMobileGet(host, {}, path, false)
    .then(function (body) {
      body = JSON.parse(body)
      const result = {
        info: body.info,
        songs: body.songs
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
