const app = require('express')();
const request = require('../../utils/request.js');

/**
 * POST /api/music/rank-list
 * @tags 酷狗音乐
 * @summary 音乐排行榜
 * @description 酷狗音乐排行榜
 */
app.post('/', function (req, res) {
  let host = 'm.kugou.com';
  let path = '/rank/list&json=true';
  let data = {};
  request
    .httpGet({ host, data, path })
    .then(function (body) {
      console.log(body);
      res.API(JSON.parse(body)['rank']);
    })
    .catch(function (err) {
      res.API_ERROR('服务器异常', 500);
      console.log(err);
    });
});

module.exports = app;
