/*
 * @Author: ecitlm
 * @Date:   2017-12-05 20:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:33:20
 */
const app = require('express')()
const Server = require('../../../utils/httpServer')

app.get('/:item_id', function (req, res) {
  const itemId = req.params.item_id || '6424603234748334594'
  const host = 'm.toutiao.com'
  const path = `/i${itemId}/info/`
  // false:http请求  true:https请求
  console.log(path)
  Server.httpGet(host, {}, path, true)
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
