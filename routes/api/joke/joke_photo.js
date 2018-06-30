/*
 * @Author: ecitlm
 * @Date:   2017-12-06 14:45:33
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:19:30
 */

const express = require('express')
const cheerio = require('cheerio')
const app = express()
const request = require('request')
const Iconv = require('iconv-lite')

function list (req, res) {
  let page = parseInt(req.params.page)
  let url = `http://www.xiaoliaoba.cn/page/tupian?page=${page}`
  console.log(url)
  request(
    {
      url: url,
      encoding: null
    },
    function (error, response, body) {
      let links = []
      if (response && response.statusCode === 200) {
        body = Iconv.decode(body, 'utf-8')
        let $ = cheerio.load(body)
        $('.cont-item').each(function () {
          let tmp = {
            title: $(this)
              .children('.cont-list-title')
              .text(),
            img: $(this)
              .children('.cont-list-main')
              .find('img')
              .attr('data-src')
          }
          links.push(tmp)
        })
        console.log(links)
        res.send({
          code: 200,
          data: links,
          msg: ''
        })
      } else {
        console.log(error)
        res.send({
          code: 404,
          msg: '网络好像有，点问题'
        })
      }
    }
  )
}

app.get('/:page', function (req, res) {
  if (isNaN(req.params.page)) {
    res.send({
      msg: '请正确填写page参数 int类型',
      code: 2
    })
    return false
  }
  list(req, res)
})
module.exports = app
