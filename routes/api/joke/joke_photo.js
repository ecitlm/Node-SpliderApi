/*
 * @Author: ecitlm
 * @Date:   2017-12-06 14:45:33
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:19:30
 */

const app = require('express')()
const cheerio = require('cheerio')
const request = require('request')
const Iconv = require('iconv-lite')

function list (req, res) {
  const page = parseInt(req.params.page)
  const url = `http://www.xiaoliaoba.cn/page/tupian?page=${page}`
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
        $('.cont-item').each(function () {
          const tmp = {
            title: $(this)
              .children('.cont-list-title')
              .text(),
            img: 'http://www.xiaoliaoba.cn' + $(this)
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
