const app = require('express')();
const request = require('@/src/utils/request');
app.get('/', function (req, res) {
  let star = req.query.star;
  if (!star) {
    res.API_ERROR('星座不能为空', 300);
    return;
  }
  let host = 'ali-star-lucky.showapi.com';
  let path = '/star?';
  let data = {
    needMonth: 1,
    needTomorrow: 1,
    needWeek: 1,
    needYear: 0,
    star: star
  };
  let headers = {
    Authorization: 'APPCODE ' + process.env.STAR_APPCODE
  };
  request
    .httpGet({ host, data, path, headers, https: true })
    .then(function (body) {
      body = JSON.parse(body);
      if (body.showapi_res_code === 0) {
        res.API(body['showapi_res_body']);
      } else {
        res.API_ERROR('验证未通过', 300);
      }
    })
    .catch(function (err) {
      res.API_ERROR('网络好像有点问题', 400);
      console.log(err);
    });
});

module.exports = app;
