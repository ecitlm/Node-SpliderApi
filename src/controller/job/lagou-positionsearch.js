// 音乐新歌榜
const app = require('express')();
const superagent = require('superagent');

/**
 * get /api/music/new-songs
 * @tags 工作职位
 * @summary 拉勾职位搜索
 * @description 拉勾职位搜索
 * @param {string}  keyword.query.required  -  搜索关键字
 * @param {string}  city.query.required  -  深圳|北京|上海|广州|南京|南昌
 */
app.get('/', function (req, res) {
  let query = req.query;
  let data = {
    pageNo: 1,
    pageSize: 15,
    city: query.city,
    sort: 0,
    keyword: query.keyword,
    isAd: '1'
  };
  superagent
    .post('https://gate.lagou.com/v1/entry/positionsearch/searchPosition/v2')
    .set('Content-Type', 'application/json')
    .send(data) // sends a JSON post body
    .set('X-L-REQ-HEADER', '{ deviceType: 1 }')
    .set('Referer', 'https://m.lagou.com/')
    .set(
      'user-agent',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36'
    )
    .end((err, data) => {
      try {
        data = JSON.parse(data.text);
        if (data.content) {
          return res.API(data.content);
        } else {
          return res.API_ERROR('系统请求错误');
        }
      } catch (e) {
        return res.API_ERROR('系统请求错误');
      }
    });
});

module.exports = app;
