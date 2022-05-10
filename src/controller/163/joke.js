const app = require('express')();
const superagent = require('superagent');

/**
 * get /api/163/joke
 * @summary 搞笑段子
 * @tags 163
 * @description 搞笑段子
 * @param {string}  page.query.required  -  分页
 */
app.get('/', function (req, res) {
  const pageSize = (req.query.page || 1) * 10;
  superagent
    .get(`https://3g.163.com/touch/jsonp/joke/chanListNews/T1419316284722/2/${pageSize}-10.html`)
    .set('Content-Type', 'application/json')
    .set(
      'user-agent',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36'
    )
    .end((err, data) => {
      try {
        data = JSON.parse(data.text);
        if (data['段子']) {
          let result = data['段子'].map(item => {
            return {
              title: item.title,
              digest: item.digest,
              source: item.source,
              sourceId: item.sourceId,
              imgsrc: item.imgsrc || ''
            };
          });
          return res.API(result);
        } else {
          return res.API_ERROR('系统请求错误');
        }
      } catch (e) {
        return res.API_ERROR('系统请求错误');
      }
    });
});

module.exports = app;
