/*
 * @Author: ecitlm
 * @Date:   2017-11-30 22:20:05
 * @Last Modified by: ecitlm
 * @Last Modified time: 2020-04-25 21:48:28
 */
const app = require('express')()
const cheerio = require('cheerio')
const request = require('request')
// const fs = require('fs')
const Iconv = require('iconv-lite')

function list (req, res) {
  const page = parseInt(req.params.page)
  const url = `https://www.meizitu.com/a/legs_${page}.html`
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
        $('.pic a img').each(function () {
          const tmp = {
            img: $(this)
              .attr('src')
              .replace('mm.chinasareview.com', 'pic.topmeizi.com'),
            title: $(this).attr('alt'),
            id: parseInt(
              $(this)
                .parent('a')
                .attr('href')
                .replace(/\D/g, '')
            )
          }
          links.push(tmp)
        })
        console.log(links)
        console.log(
          '-----------------------------splider success-----------------------------'
        )
        /*        fs.writeFile(`./download/${page}.json`, JSON.stringify(links), function(err) {
                                    if (err) throw err
                                    console.log('文件写入成功')
                                }); */
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
