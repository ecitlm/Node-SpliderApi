const app = require('express')();
const request = require('../../utils/request.js');

/**
 * POST /api/music/singer-info
 * @tags 酷狗音乐
 * @summary  歌手详细信息
 * @description  歌手详细信息
 */
app.get('/:singerid', function (req, res) {
  let singerid = req.params.singerid;
  let host = 'm.kugou.com';
  let path = `/singer/info/${singerid}&json=true`;
  // false:http请求  true:https请求
  request
    .httpMobileGet({ host, path })
    .then(function (body) {
      body = JSON.parse(body);
      let result = {
        info: body['info'],
        songs: body['songs']
      };
      res.API(result);
    })
    .catch(function (err) {
      res.API_ERROR('服务器异常', 500);
      console.log(err);
    });
});

module.exports = app;
