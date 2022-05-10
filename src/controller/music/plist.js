const app = require('express')();
const request = require('../../utils/request.js');

/**
 * POST /api/music/plist
 * @tags 酷狗音乐
 * @summary 音乐歌单
 * @description 酷狗音乐歌单
 */
app.post('/', function (req, res) {
  let host = 'm.kugou.com';
  let path = '/plist/index&json=true';
  let data = {};
  // false:http请求  true:https请求
  request
    .httpGet({ host, data, path })
    .then(function (body) {
      res.API(JSON.parse(body)['plist']);
    })
    .catch(function (err) {
      res.API_ERROR('服务器异常', 500);
      console.log(err);
    });
});

module.exports = app;
