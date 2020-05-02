/*
 * @Author: ecitlm
 * @Date:   2017-12-01 21:06:42
 * @Last Modified by: ecitlm
 * @Last Modified time: 2020-05-02 08:37:42
 */
const app = require('express')()
const cheerio = require('cheerio')
const request = require('request')
const Iconv = require('iconv-lite')

function list (req, res) {
  const date = parseInt(req.params.date)
  const url = `http://caibaojian.com/fe-daily-${date}.html`
  const headers = {
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
        const $ = cheerio.load(body)
        var link = {
          title: $('.entry-title a').text(),
          description: $('.fe-desc').text(),
          links: []
        }
        $('.feddaily-list li').each(function () {
          const title = $(this)
            .find('.fed-title a')
            .text()
          const description = $(this)
            .find('.fed-con')
            .text()
          const href =
            $(this)
              .find('.fed-con a')
              .last()
              .attr('href') || ''
          const tmp = {
            title: title,
            description: description,
            url: decodeURIComponent(href.split('url=')[1]) !== 'undefined' ? decodeURIComponent(href.split('url=')[1]) : decodeURIComponent(href.split('target=')[1])
          }
          link.links.push(tmp)
        })
        console.table(link.links)
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
