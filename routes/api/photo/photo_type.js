/*
 * @Author: ecitlm
 * @Date:   2017-11-30 22:40:46
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:20:14
 */
const app = require('express')()
const cheerio = require('cheerio')
const request = require('request')
const Iconv = require('iconv-lite')

function regx (str) {
  const reg = /\/([^/]+)\.html/
  if (reg.test(str)) {
    return RegExp.$1
  }
}

function list (req, res) {
  const url = 'http://www.meizitu.com/'
  console.log(url)
  request(
    {
      url: url,
      encoding: null
    },
    function (error, response, body) {
      const links = []
      if (response && response.statusCode === 200) {
        body = Iconv.decode(body, 'gb2312')
        const $ = cheerio.load(body)
        $('.tags a').each(function () {
          const tmp = {
            title: $(this).text(),
            id: regx($(this).attr('href'))
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
