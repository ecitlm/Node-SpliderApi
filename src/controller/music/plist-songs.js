const app = require('express')();
const request = require('../../utils/request.js');

/**
 * POST /api/music/plist-songs
 * @tags 酷狗音乐
 * @summary  音乐歌单下的音乐列表
 * @description  音乐歌单下的音乐列表
 */
app.post('/:specialid', function (req, res) {
  let specialid = req.params.specialid;
  let host = 'm.kugou.com';
  let path = `/plist/list/${specialid}?json=true`;
  request
    .httpGet({ host, path })
    .then(function (body) {
      console.log(body);
      res.API(JSON.parse(body)['list']);
    })
    .catch(function (err) {
      res.API_ERROR('服务器异常', 500);
      console.log(err);
    });
});

module.exports = app;
