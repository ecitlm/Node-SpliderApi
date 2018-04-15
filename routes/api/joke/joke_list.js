/*
 * @Author: ecitlm
 * @Date:   2017-12-01 21:30:50
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:31:00
 */
const express = require('express')
const app = express()
const Server = require('../../../utils/httpServer')

app.get('/:page', function (req, res) {
  let page = req.params.page
  let host = '3g.163.com'
  let path = `/touch/jsonp/joke/chanListNews/T141931628472/2/${page}-20.html`
  let data = {}
  // false:http请求  true:https请求
  Server.httpGet(host, data, path, false)
    .then(function (body) {
      let list = JSON.parse(body)['段子']
      let arr = []
      for (let i in list) {
        arr.push({
          title: list[i].title,
          source: list[i].source,
          digest: list[i].digest
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
