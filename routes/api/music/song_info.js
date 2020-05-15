/*
 * @Author: ecitlm
 * @Date:   2017-12-01 08:57:07
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:33:04
 */

// 音乐详情信息
const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/:hash', function (req, res) {
  const hash = req.params.hash
  const host = 'm.kugou.com'
  const path = `/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`
  // false:http请求  true:https请求
  Server.httpGet(host, {}, path, false)
    .then(function (body) {
      res.send({
        code: 200,
        data: JSON.parse(body),
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
