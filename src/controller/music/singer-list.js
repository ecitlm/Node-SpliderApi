const app = require('express')();
const request = require('../../utils/request.js');

/**
 * POST /api/music/songer-list
 * @tags 酷狗音乐
 * @summary  歌手分类下面的某一类歌手
 * @description  歌手分类下面的某一类歌手
 */
app.post('/:classid', function (req, res) {
  let classid = req.params.classid;
  let host = 'm.kugou.com';
  let path = `/singer/list/${classid}&json=true`;
  // false:http请求  true:https请求
  request
    .httpGet({ host, path })
    .then(function (body) {
      body = JSON.parse(body);
      let result = {
        classname: body['classname'],
        classid: body['classid'],
        singers: body['singers']
      };
      res.API(result);
    })
    .catch(function (err) {
      res.API_ERROR('服务器异常', 500);
      console.log(err);
    });
});

module.exports = app;
