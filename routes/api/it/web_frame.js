/*
 * @Author: ecitlm
 * @Date:   2017-12-01 20:29:08
 * @Last Modified by: ecitlm
 * @Last Modified time: 2020-05-15 21:40:11
 */
const app = require('express')()
const cheerio = require('cheerio')
const request = require('request')
const Iconv = require('iconv-lite')

/**
 * 获取前端TOP100
 * @param req
 * @param res
 */
function list (req, res) {
  const url = 'https://www.awesomes.cn/rank'
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
        const link = []
        $('.list-item').each(function () {
          const index = $(this)
            .find('.scord')
            .text()
          const thumb = $(this)
            .find('.cover')
            .attr('src')
          const title = $(this)
            .find('h4')
            .text()
          const description = $(this)
            .find('.sdesc')
            .text()
          const href =
            $(this)
              .find('a')
              .attr('href')
          const tmp = {
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
          msg: 'success'
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
