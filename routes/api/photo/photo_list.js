/*
 * @Author: ecitlm
 * @Date:   2017-11-30 22:20:05
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:20:08
 */
const express = require('express')
const cheerio = require('cheerio')
const app = express()
const request = require('request')
// const fs = require('fs')
const Iconv = require('iconv-lite')

function list (req, res) {
  let page = parseInt(req.params.page)
  let url = `http://www.meizitu.com/a/legs_${page}.html`
  request(
    {
      url: url,
      encoding: null
    },
    function (error, response, body) {
      let links = []
      if (response && response.statusCode === 200) {
        body = Iconv.decode(body, 'gb2312')
        let $ = cheerio.load(body)
        $('.pic a img').each(function () {
          let tmp = {
            img: $(this)
              .attr('src')
              .replace('mm.howkuai.com', 'mm.chinasareview.com'),
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
