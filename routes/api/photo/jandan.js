/*
 * @Author: ecitlm
 * @Date: 2017-12-07 19:56:26
 * @Last Modified by: ecitlm
 * @Last Modified time: 2020-04-25 21:42:33
 */
const app = require('express')()
// const http = require('http')
const cheerio = require('cheerio')
const request = require('request')
// const fs = require('fs')
const Iconv = require('iconv-lite')
// const async = require('async')

function list (req, res) {
  const page = parseInt(req.params.page)
  const url = `http://jandan.net/ooxx/page-${page}#comments`
  const headers = {
    connection: 'keep-alive',
    Cookie:
      '__cfduid=d34c02daf3555deb8443c4202ca0ca7d41511794384; gif-click-load=off; _ga=GA1.2.498763940.1511794387; _gid=GA1.2.1281594283.1512647401',
    accept:
      'text/html, application/xhtml+xml, application/xml; q=0.9, image/webp,image/apng, */*;q=0.8',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
  }
  request(
    {
      url: url,
      encoding: null,
      headers: headers,
      timeout: 5000
    },
    function (_error, response, body) {
      const links = []
      if (response) {
        body = Iconv.decode(body, 'utf-8')
        const $ = cheerio.load(body)
        $('#content .commentlist li').each(function () {
          const img =
            $(this).find('a.view_img_link').attr('href') ||
            $(this).find('img').attr('src')
          links.push('http:' + img)
        })

        res.send({
          code: 200,
          data: links,
          msg: ''
        })
      } else {
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
