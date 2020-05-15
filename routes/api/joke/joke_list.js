/*
 * @Author: ecitlm
 * @Date:   2017-12-01 21:30:50
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:31:00
 */
const app = require('express')()
const Server = require('../../../utils/httpServer')

app.get('/:page', function (req, res) {
  const page = req.params.page
  const host = '3g.163.com'
  const path = `/touch/jsonp/joke/chanListNews/T1419316284722/2/${page}-20.html`
  const data = {}
  // false:http请求  true:https请求
  Server.httpGet(host, data, path, true)
    .then(function (body) {
      console.log(body)
      const list = JSON.parse(body)['段子']
      const arr = []
      for (const i in list) {
        arr.push({
          title: list[i].title,
          source: list[i].source,
          digest: list[i].digest
        })
      }

      res.send({
        code: 200,
        data: arr,
        msg: 'success'
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
