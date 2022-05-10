const app = require('express')();
const request = require('../../utils/request.js');

/**
 * POST /api/music/song-lrc
 * @tags 酷狗音乐
 * @summary  取音乐歌词
 * @description  获取音乐歌词
 */

// 获取音乐歌词
app.post('/:hash', function (req, res) {
  let hash = req.params.hash;
  let host = 'm.kugou.com';
  let path = `/app/i/krc.php?cmd=100&hash=${hash}&timelength=3012000`;
  let data = {};
  // false:http请求  true:https请求
  request
    .httpGet({ host, data, path })
    .then(function (body) {
      res.API(body);
    })
    .catch(function (err) {
      res.API_ERROR('服务器异常', 500);
      console.log(err);
    });
});

module.exports = app;
