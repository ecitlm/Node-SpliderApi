/*
 * @Author: ecitlm
 * @Date:   2017-12-06 22:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:33:47
 */
const app = require('express')()
const Server = require('../../../utils/httpServer')
app.get('/:type/:page', function (req, res) {
  let id
  const type = parseInt(req.params.type)
  const page = parseInt(req.params.page)
  // 0搞笑视频  1美女视频  2体育视频  3 新闻现场 4涨姿势  5猎奇  6 黑科技 默认搞笑视频
  switch (type) {
    case 0:
      id = 'VAP4BFE3U'
      break
    case 1:
      id = 'VAP4BG6DL'
      break
    case 2:
      id = 'VBF8F2E94'
      break
    case 3:
      id = 'VAV3H6JSN'
      break
    case 4:
      id = 'VBF8F3SGL'
      break
    case 5:
      id = 'VBF8ET3S2'
      break
    case 6:
      id = 'VBF8F2PKF'
      break
    default:
      id = 'VAP4BFE3U'
  }

  const host = 'c.m.163.com'
  const path = `/nc/video/list/${id}/y/${page}-20.html`
  // false:http请求  true:https请求
  console.log(path)
  Server.httpGet(host, {}, path, true)
    .then(function (body) {
      const arr = JSON.parse(body)
      res.send({
        code: 200,
        data: arr[id],
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
