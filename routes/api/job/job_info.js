/*
 * @Author: ecitlm
 * @Date: 2017-12-19 09:49:04
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:13:25
 */
const app = require('express')()
const cheerio = require('cheerio')
const request = require('request')
const Iconv = require('iconv-lite')
const Entities = require('html-entities').XmlEntities
const entities = new Entities()

function list (req, res) {
  const positionId = parseInt(req.params.positionId)
  const url = `https://www.lagou.com/jobs/${positionId}.html`
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
    function (error, response, body) {
      if (response && response.statusCode === 200) {
        body = Iconv.decode(body, 'utf-8')
        const $ = cheerio.load(body)
        const data = {
          title: $('title').text(),
          publishtime: $('.publish_time').text(),
          job: $('.job-name')
            .find('.name')
            .text(),
          salary: $('.ceil-salary').text(),
          workyear: $('.salary')
            .next('span')
            .next('span')
            .text(),
          education: $('.salary')
            .next('span')
            .next('span')
            .next('span')
            .text(),
          workaddress: $("input[name='workAddress']").val(),
          positionAddress: $("input[name='positionAddress']").val(),
          temptation: $('.job-advantage').text(),
          content: entities.decode(
            $('.job_bt')
              .find('div')
              .html()
          )
        }
        console.log(data)
        res.send({
          code: 200,
          data: data,
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

app.get('/:positionId', function (req, res) {
  list(req, res)
})
module.exports = app
