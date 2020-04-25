/*
 * @Author: ecitlm
 * @Date:   2017-12-01 20:29:08
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:13:07
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
  let url = 'https://www.awesomes.cn/rank'
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
          console.log(i)
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
            $(this)
              .find('a')
              .attr('href')
          let logo =  $(this)
            .find('img')
            .attr('src')
          let tmp = {
            index: index,
            thumb: thumb,
            title: title,
            description: description,
            url: href.replace('/repo', ''),
            logo:logo
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
