const app = require('express')();
const request = require('../../utils/request.js');

/**
 * POST /api/music/new-songs
 * @tags 酷狗音乐
 * @summary 音乐新歌榜
 * @description 酷狗音乐新歌榜
 */
app.post('/', function (req, res) {
  let host = 'm.kugou.com';
  let path = '/?json=true';
  let data = {};
  request
    .httpGet({ host, data, path })
    .then(function (body) {
      console.log(body);
      res.API(JSON.parse(body)['data']);
    })
    .catch(function (err) {
      res.API_ERROR('服务器异常');
      console.log(err);
    });
});

module.exports = app;
