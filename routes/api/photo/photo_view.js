/*
 * @Author: ecitlm
 * @Date:   2017-11-30 21:33:20
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:20:25
 */
const express = require('express')
const cheerio = require('cheerio')
const app = express()
const request = require('request')
const Iconv = require('iconv-lite')
// const colors = require('../../../utils/log_color') // 控制台彩色输出
const connection = require('../../../config/dbs') // 导入mysq配置文件

// 创建一个connection
connection.connect(function (err) {
  if (err) {
    console.log('[query] - :' + err)
    return
  }
  console.log('数据库链接成功-connection success')
})

function view (req, res) {
  let id = req.params.id || 3788

  // 先查询数据库是否有该数据
  let sql = 'SELECT  list FROM photo_detail WHERE (id =' + id + ')'
  connection.query(sql, function (err, rows, fields) {
    console.log('==================================='.green)
    console.log(sql.green) // 输出sql语句
    console.log('==================================='.green)
    if (err) {
      console.log('[query] - :' + err)
    } else {
      console.log(rows[0])
      if (rows[0]) {
        console.log(
          '========select data  from database 数据库中的数据====================='
            .verbose
        )
        res.send({
          code: 200,
          data: JSON.parse(rows[0].list),
          msg: ''
        })
      } else {
        console.log(
          '===============else splider data form curl===================\n'
            .verbose
        )
        requestApi(res, id)
      }
      // console.log(fields); //返回数据库的基本信息、表字段数据长度等
    }
  })
  return false
}

/**
 * 插入数据库
 * @param {*} links
 * @param {*} id
 */
function insert (links, id) {
  let sql =
    "INSERT INTO photo_detail (`list`, `id`, `title`, `tag`) VALUES ('" +
    JSON.stringify(links) +
    "'," +
    id +
    ",'" +
    title +
    "','" +
    tag +
    "')"
  connection.query(sql, function (err, rows, fields) {
    console.log('==================================='.green)
    console.log(sql.green) // 输出sql语句
    console.log('==================================='.green)
    if (err) {
      console.log('[query] - :' + err)
      return
    }
    console.log(
      `-----------------数据写入成功-success->>>>id:${id}------------------`
    )
  })
}

/**
 * 网络请求
 * @param {*} res
 */
function requestApi (res, id) {
  let url = `http://www.meizitu.com/a/${id}.html`
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
        let title = $('.metaRight h2').text()
        let tag = $('.metaRight p')
          .text()
          .split('Tags:')[1]
        $('#picture p img').each(function () {
          links.push($(this).attr('src'))
        })
        console.log(links)
        res.send({
          code: 200,
          data: links,
          msg: ''
        })
        console.log(
          '\n-----------------开始写入数据库-start>>>>id:' +
            id +
            '------------------'
        )
        insert(links, id, title, tag)
      } else {
        console.log(error)
        res.send({
          code: 404,
          data: '',
          msg: '网络好像有，点问题'
        })
      }
    }
  )
}

app.get('/:id', function (req, res) {
  console.log(req.params)
  view(req, res)
})

module.exports = app
