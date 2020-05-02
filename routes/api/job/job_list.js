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
  const city = encodeURIComponent(req.params.city)
  const positionName = encodeURIComponent(req.params.positionName)
  const pageNo = req.params.pageNo
  const host = 'm.lagou.com'
  const path = `/search.json?city=${city}&positionName=${positionName}&pageNo=${pageNo}&pageSize=15`
  const data = {}
  const headers = {
    Cookie: '_ga=GA1.3.590539051.1569050043; _gat=1; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1568534090; _ga=GA1.2.590539051.1569050043; _gid=GA1.2.1536671944.1569050044; LGSID=20190921151403-64576d85-dc3f-11e9-9470-525400f775ce; PRE_UTM=; PRE_HOST=; PRE_SITE=https%3A%2F%2Fm.lagou.com%2Futrack%2FtrackMid.html%3Ff%3Dhttps%253A%252F%252Fm.lagou.com%252Fsearch.html%26t%3D1569049825%26_ti%3D1; PRE_LAND=https%3A%2F%2Fm.lagou.com%2Fsearch.html; LGUID=20190921151403-64576f87-dc3f-11e9-9470-525400f775ce; JSESSIONID=ABAAABAAAGEAAJHF7DCFB8E18F02FEFEFF4BAFBFAB562F5; user_trace_token=20190921151522-8f670b6c-ac6e-42b5-9af6-078060d8cb73; X_MIDDLE_TOKEN=fa9d9040a3a146c9d1627aa2eb07082f; LGRID=20190921151541-9ea429c2-dc3f-11e9-a524-5254005c3644; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1569050142; X_HTTP_TOKEN=f962a917875c10ed14105096517c69f444677c798b',
    Host: 'm.lagou.com',
    Referer: 'https://m.lagou.com/search.html',
    'ec-Fetch-Site': 'same-origin',
    Connection: 'keep-alive',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
  }
  // false:http请求  true:https请求
  Server.httpGet(host, data, path, true, headers)
    .then(function (body) {
      console.log(body)
      try {
        const list = JSON.parse(body).content.data
        res.send({
          code: 200,
          data: list,
          msg: ''
        })
      } catch (e) {
        res.send({
          code: 403,
          data: '',
          msg: JSON.parse(body).msg
        })
      }
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
