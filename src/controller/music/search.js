const app = require('express')();
const request = require('../../utils/request.js');

/**
 * POST /api/music/search
 * @tags 酷狗音乐
 * @summary 音乐搜索
 * @description 酷狗音乐搜索
 * @param {string}  keyword.params.required  -  搜索关键字
 */
app.post('/', function (req, res) {
  console.log(req.params);
  let keyword = encodeURIComponent(req.params.keyword);
  console.log();
  let host = 'mobilecdn.kugou.com';
  let path = `/api/v3/search/song?format=json&keyword=${keyword}&page=1&pagesize=20&showtype=1`;
  let data = {};
  // false:http请求  true:https请求
  request
    .httpGet({ host, data, path })
    .then(function (body) {
      res.API(JSON.parse(body)['data']);
    })
    .catch(function (err) {
      res.API_ERROR('服务器异常', 500);
      console.log(err);
    });
});

module.exports = app;
