/*
 * @Author: ecitlm
 * @Date: 2017-12-07 14:57:40
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:29:37
 */
const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/:city/:positionName/:pageNo', function (req, res) {
  let city = encodeURIComponent(req.params.city)
  let positionName = encodeURIComponent(req.params.positionName)
  let pageNo = req.params.pageNo
  let host = 'm.lagou.com'
  let path = `/search.json?city=${city}&positionName=${positionName}&pageNo=${pageNo}&pageSize=15`
  let data = {}
  // false:http请求  true:https请求
  Server.httpGet(host, data, path, true)
    .then(function (body) {
      let list = JSON.parse(body)['content']['data']
      res.send({
        code: 200,
        data: list,
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
