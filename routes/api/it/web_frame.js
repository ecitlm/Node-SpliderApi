/*
 * @Author: ecitlm
 * @Date:   2017-12-01 20:29:08
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:13:07
 */
const express = require('express')
const cheerio = require('cheerio')
const app = express()
const request = require('request')
const Iconv = require('iconv-lite')

/**
 * [list 抓取最新十天的前端日报]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function list (req, res) {
  let url = 'http://cdn.it919.cn/frame.html'
  let headers = {
    Connection: 'keep-alive',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'
  }
  request(
    {
      url: url,
      encoding: null,
      headers: headers
    },
    function (error, response, body) {
      if (response && response.statusCode === 200) {
        body = Iconv.decode(body, 'utf-8')
        let $ = cheerio.load(body)
        let link = []
        $('.list-item').each(function (i, v) {
          let index = $(this)
            .find('.scord')
            .text()
          let thumb = $(this)
            .find('.cover')
            .attr('src')
          let title = $(this)
            .find('h4')
            .text()
          let description = $(this)
            .find('.sdesc')
            .text()
          let href =
            'https://github.com' +
            $(this)
              .find('a')
              .attr('href')
          let tmp = {
            index: index,
            thumb: thumb,
            title: title,
            description: description,
            url: href.replace('/repo', '')
          }
          link.push(tmp)
        })
        res.send({
          code: 200,
          data: link,
          msg: ''
        })
      } else {
        console.log(error)
        res.send({
          code: 404,
          msg: '网络好像有点问题'
        })
      }
    }
  )
}
app.get('/', function (req, res) {
  list(req, res)
})
module.exports = app
