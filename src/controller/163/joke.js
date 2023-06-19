const app = require('express')();
const superagent = require('superagent');
const cheerio = require('cheerio');
/**
 * get /api/163/joke
 * @summary 搞笑段子
 * @tags 163
 * @description 搞笑段子
 * @param {string}  page.query.required  -  分页
 */
app.get('/', function (req, res) {
  const pageSize = (req.query.page || 1);
  superagent
    .get(`https://duanzi.cn/page/${pageSize}/`)
    .set('Content-Type', 'text/html; charset=UTF-8')
    .set(
      'user-agent',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36'
    )
    .end((err, data) => {
      let tmp = [];
      try {
        const $ = cheerio.load(data.text, { decodeEntities: false });
        $('#sticky .item').each(function (index, item) {
          let title = $(item).find('h2 a').text();
          let intro = $(item).children('.intro').text();
          let list = {
            title,
            intro
          };
          tmp.push(list);
        });
        res.API(tmp);
      } catch (e) {
        return res.API_ERROR('系统请求错误');
      }
    });
});

module.exports = app;
