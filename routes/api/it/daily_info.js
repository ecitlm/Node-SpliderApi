/*
 * @Author: ecitlm
 * @Date:   2017-12-01 21:06:42
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:13:07
 */
const express = require('express')
const cheerio = require('cheerio')
const app = express()
const request = require('request')
const Iconv = require('iconv-lite')

function list (req, res) {
  let date = parseInt(req.params.date)
  let url = `http://caibaojian.com/fe-daily-${date}.html`
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
        var link = {
          title: $('.entry-title a').text(),
          description: $('.fe-desc').text(),
          links: []
        }
        $('.feddaily-list li').each(function () {
          let title = $(this)
            .find('.fed-title a')
            .text()
          let description = $(this)
            .find('.fed-con')
            .text()
          let href =
            $(this)
              .find('.tlink')
              .attr('href') || ''
          let tmp = {
            title: title,
            description: description,
            url: href.split('url=')[1]
          }
          link.links.push(tmp)
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
          msg: '网络好像有，点问题'
        })
      }
    }
  )
}

app.get('/:date', function (req, res) {
  list(req, res)
})
module.exports = app
