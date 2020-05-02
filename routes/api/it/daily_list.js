/*
 * @Author: ecitlm
 * @Date:   2017-12-01 21:02:46
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:12:54
 */

const app = require('express')()
const cheerio = require('cheerio')
const request = require('request')
const Iconv = require('iconv-lite')

function list (req, res) {
  const url = 'http://caibaojian.com/c/news'
  console.log(url)
  request(
    {
      url: url,
      encoding: null
    },
    function (error, response, body) {
      const links = []
      if (response && response.statusCode === 200) {
        body = Iconv.decode(body, 'utf-8')
        const $ = cheerio.load(body)
        $('#content article ').each(function () {
          const title = $(this)
            .find('.entry-title span')
            .text()
          const description = $(this)
            .find('.entry-content p')
            .text()
          const href = $(this)
            .find('.read-more')
            .attr('href')
          const date = $(this)
            .find('.entry-date')
            .text()
          const tmp = {
            title: title,
            id: parseInt(title),
            description: description,
            date: date,
            url: href
          }
          links.push(tmp)
        })
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

app.get('/', function (req, res) {
  list(req, res)
})
module.exports = app
