const app = require('express')();
const request = require('../../utils/request.js');

/**
 * POST /api/music/song-info
 * @tags 酷狗音乐
 * @summary  音乐详情信息
 * @description  音乐详情信息
 */
app.post('/:hash', function (req, res) {
  let hash = req.params.hash;
  let host = 'm.kugou.com';
  let path = `/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`;
  let data = {};
  // false:http请求  true:https请求
  request
    .httpGet({ host, data, path })
    .then(function (body) {
      res.API(JSON.parse(body));
    })
    .catch(function (err) {
      res.API_ERROR('服务器异常', 500);
      console.log(err);
    });
});

module.exports = app;
