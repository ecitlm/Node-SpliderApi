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
  let headers = {
    'Cookie': 'user_trace_token=20190915155447-09a3f9200edf42a29617cceddc35ba0f; JSESSIONID=ABAAABAAAGEAAJHA1D28E2426C9F7162B7A374F5440CC6F; _ga=GA1.2.1385421240.1568534090; _gid=GA1.2.116090360.1568534090; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1568534090; _ga=GA1.3.1385421240.1568534090; LGSID=20190915155451-1924633f-d78e-11e9-a514-5254005c3644; PRE_UTM=; PRE_HOST=; PRE_SITE=; PRE_LAND=https%3A%2F%2Fm.lagou.com%2F; LGUID=20190915155451-1924666e-d78e-11e9-a514-5254005c3644; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1568534134; LGRID=20190915155533-32212a54-d78e-11e9-a514-5254005c3644; X_HTTP_TOKEN=9db32636f7cfa80c181435865152787160d788536a',
    'Host': 'm.lagou.com',
    'Referer': 'https://m.lagou.com/search.html'
  }
  // false:http请求  true:https请求
  Server.httpGet(host, data, path, true, headers)
    .then(function (body) {
      console.log(body)
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
