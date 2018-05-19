/*
 * @Author: ecitlm
 * @Date:   2017-12-01 21:41:02
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:30:38
 */

const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/', function (req, res) {
  let host = 'api.laifudao.com'
  let path = `/open/tupian.json`
  let data = {}
  // false:http请求  true:https请求
  Server.httpGet(host, data, path, false)
    .then(function (body) {
      let list = JSON.parse(body)
      let arr = []
      for (let i in list) {
        arr.push({
          title: list[i].title,
          thumburl: list[i].thumburl,
          sourceurl: list[i].sourceurl
        })
      }

      res.send({
        code: 200,
        data: arr,
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
