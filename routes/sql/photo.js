/* 
 * @Author: ecitlm
 * @Date:   2017-11-28 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-11-28 23:50:52
 */
const express = require('express')
const http = require('http')
const cheerio = require("cheerio")
const app = express()
const request = require("request");
const Iconv = require('iconv-lite');
const connection = require('../untils/sql'); //导入mysq配置文件

//创建一个connection
connection.connect(function(err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect]  succeed!');
});

function view(req, res) {
    var res = res;
    var req = req;
    var id = req.query.id || 1;


    //先查询数据库是否有该数据
    var sql = "SELECT  list FROM photo_detail WHERE (id =" + id + ")";
    connection.query(sql, function(err, rows, fields) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        } else {
            console.log(rows[0]);
            if (rows[0]) {
                console.log("========select  from database 数据库中的数据=====================")
                res.send({
                    msg: "success",
                    data: JSON.parse(rows[0].list),
                    code: 1
                })
            } else {
                console.log("===============else===================");
                // requestApi(res, id);
                for (var i = 3950; i < 4000; i++) {
                    requestApi(res, i);
                    setTimeout(function() {}, 100)
                }

            }
            console.log(fields);
        }
    });
    return false;
}

/**
 * 插入数据库
 * @param {*} links 
 * @param {*} id 
 */
function insert(links, id) {
    var sql = "INSERT INTO photo_detail (`list`, `id`, `title`, `tag`) VALUES ('" + JSON.stringify(links) + "'," + id + ",'" + title + "','" + tag + "')";
    connection.query(sql, function(err, rows, fields) {
        console.log(sql);
        return;
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
    });
}

/**
 * 网络请求
 * @param {*} res 
 */
function requestApi(res, id) {
    var url = `http://www.meizitu.com/a/${id}.html`;
    request({
        url: url,
        encoding: null
    }, function(error, response, body) {
        var links = [];
        if (response && response.statusCode == 200) {
            var body = Iconv.decode(body, 'gb2312');
            $ = cheerio.load(body);
            title = $(".metaRight h2").text();
            tag = $(".metaRight p").text().split("Tags:")[1]
            $('#picture p img').each(function() {
                links.push($(this).attr('src'));
            });
            console.log(links);
            // res.send({
            //     msg: "success",
            //     data: links,
            //     code: 1
            // });
            console.log('-----------------开始插入数据库>>>>id:' + id + '------------------');
            insert(links, id, title, tag);

        } else {
            res.send({
                msg: "网络好像有，点问题",
                code: 0
            })
        }
    });
}

app.get('/', function(req, res) {
    console.log(req.query.id); //输出index
    view(req, res)
});

module.exports = app;