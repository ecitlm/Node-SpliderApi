/*
 * @Author: ecitlm
 * @Date:   2017-12-01 21:02:46
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-14 23:28:04
 */

const express = require('express')
const http = require('http')
const cheerio = require('cheerio')
const app = express()
const request = require('request')
const Iconv = require('iconv-lite')

function list (req, res) {
  var url = 'http://caibaojian.com/c/news'
  console.log(url)

  request(
    {
      url: url,
      encoding: null
    },
    function (error, response, body) {
      let links = []
      if (response && response.statusCode == 200) {
        body = Iconv.decode(body, 'utf-8')
        $ = cheerio.load(body)
        $('#content article ').each(function () {
          let title = $(this)
            .find('.entry-title span')
            .text()
          let description = $(this)
            .find('.entry-content p')
            .text()
          let href = $(this)
            .find('.read-more')
            .attr('href')
          let date = $(this)
            .find('.entry-date')
            .text()
          let tmp = {
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
