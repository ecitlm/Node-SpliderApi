const app = require('express')();
const request = require('../../utils/request.js');

/**
 * POST /api/music/rank-list-info
 * @tags 酷狗音乐
 * @summary  排行榜下的音乐列表
 * @description  排行榜下的音乐列表
 */
app.post('/:rankId', function (req, res) {
  let rankId = req.params.rankId;
  let host = 'm.kugou.com';
  let path = `/rank/info/${rankId}&json=true`;
  request
    .httpGet({ host, path })
    .then(function (body) {
      body = JSON.parse(body);
      let result = {
        info: body['info'],
        songs: body['songs'],
        pagesize: body['pagesize']
      };
      res.API(result);
    })
    .catch(function (err) {
      res.API_ERROR('服务器异常', 500);
      console.log(err);
    });
});

module.exports = app;
