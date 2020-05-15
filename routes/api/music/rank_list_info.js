/*
 * @Author: ecitlm
 * @Date:   2017-12-01 09:34:53
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:32:48
 */

// 排行榜下的音乐列表
const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/:rankid', function (req, res) {
  const rankid = req.params.rankid
  const host = 'm.kugou.com'
  const path = `/rank/info/${rankid}&json=true`
  // false:http请求  true:https请求
  Server.httpGet(host, {}, path, false)
    .then(function (body) {
      body = JSON.parse(body)
      const result = {
        info: body.info,
        songs: body.songs,
        pagesize: body.pagesize
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
