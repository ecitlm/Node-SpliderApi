/*
 * @Author: ecitlm
 * @Date:   2017-11-30 22:20:05
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-06 16:18:57
 */
const express = require('express')
const http = require('http')
const cheerio = require('cheerio')
const app = express()
const request = require('request')
const fs = require('fs')
const Iconv = require('iconv-lite')

function list(req, res) {
    var res = res
    var req = req
    var page = parseInt(req.params.page)
    var url = `http://www.meizitu.com/a/legs_${page}.html`
    request({
            url: url,
            encoding: null
        },
        function(error, response, body) {
            var links = []
            if (response && response.statusCode == 200) {
                var body = Iconv.decode(body, 'gb2312')
                $ = cheerio.load(body)
                $('.pic a img').each(function() {
                    var tmp = {
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
                                });*/
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

app.get('/:page', function(req, res) {
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