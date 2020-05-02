/*
 * @Author: ecitlm
 * @Date:   2017-12-01 22:00:20
 * @Last Modified by: ecitlm
 * @Last Modified time: 2020-04-25 21:36:20
 */

const app = require('express')()
const Server = require('../../../utils/httpServer')
// const async = require('async')
// const fs = require('fs')
// const request = require('request')

function MathRand (n) {
  let Num = ''
  for (let i = 0; i < 8; i++) {
    Num += Math.floor(Math.random() * 10)
  }
  return Num
}

app.get('/', function (req, res) {
  const host = 'huaban.com'
  // let path = `/favorite/beauty?jao0fn1x&max=11${random}&limit=30&wfl=1`
  const path = `/favorite/beauty/?k9fnqrrd&max=311323${MathRand(5)}&limit=20&wfl=1`
  const data = {}
  // false:http请求  true:https请求
  Server.ajaxGet(host, data, path, true)
    .then(function (body) {
      const list = JSON.parse(body).pins
      const arr = []
      for (const i in list) {
        arr.push({
          url: 'http://img.hb.aicdn.com/' + list[i].file.key,
          file: list[i].file.key,
          title: list[i].board.title,
          desc: list[i].board.description,
          like: list[i].like_count
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
