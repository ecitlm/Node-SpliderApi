const app = require('express')();
const request = require('../../utils/request.js');
/**
 * GET /api/tt/news-detail
 * @tags 163
 * @summary 头条新闻详情
 * @description 头条新闻详情
 * @param {string}  item_id.query.required  -  item_id
 */
app.get('/', function (req, res) {
  const itemId = req.query.item_id || '6424603234748334594';
  const host = 'm.toutiao.com';
  const path = `/i${itemId}/info/`;
  request
    .httpGet({ host, path, status: true })
    .then(function (body) {
      res.API(JSON.parse(body).data);
    })
    .catch(function (err) {
      res.API_ERROR('网络好像有点问题', 500);
      console.log(err);
    });
});

module.exports = app;
