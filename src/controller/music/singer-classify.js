const app = require('express')();
const request = require('../../utils/request.js');

/**
 * POST /api/music/singer-classify
 * @tags 酷狗音乐
 * @summary  歌手分类
 * @description  歌手分类
 */
app.post('/', function (req, res) {
  let host = 'm.kugou.com';
  let path = '/singer/class&json=true';
  // false:http请求  true:https请求
  request
    .httpGet({ host, path })
    .then(function (body) {
      res.API(JSON.parse(body)['list']);
    })
    .catch(function (err) {
      res.API_ERROR('服务器异常', 500);
      console.log(err);
    });
});

module.exports = app;
