const express = require('express');
const cheerio = require('cheerio');
const app = express();
const download = require('download');
const request = require('request');
const Iconv = require('iconv-lite');

/**
 * GET /api/down-img/
 * @summary 彼岸桌面图片
 * @description 彼岸桌面图片、并下载
 * @param {string}  page.query.required  -  page
 */
function list(req, res) {
  const page = req.query.page == 1 ? '' : '_' + req.params.page;
  let url = `http://www.netbian.com/meinv/index${page}.htm`;
  let headers = {
    'Proxy-Connection': 'keep-alive',
    Host: 'www.netbian.com',
    Referer: 'http://www.netbian.com/meinv/index.htm',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Upgrade-Insecure-Requests': 1,
    Connection: 'keep-alive',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
  };
  request(
    {
      url: url,
      encoding: null,
      headers: headers
    },
    function (error, response, body) {
      console.log(body);
      if (response && response.statusCode === 200) {
        body = Iconv.decode(body, 'gb2312');
        const $ = cheerio.load(body, { decodeEntities: false });
        let tmp = [];
        $('.list li').each(function (i, ele) {
          let img = $(ele).find('img').attr('src');
          let bigImg = img.replace('small', '').split('16')[0] + '.jpg';
          let title = $(ele).text();
          let imgList = {
            img,
            bigImg,
            title
          };
          tmp.push(imgList);
        });
        res.API(tmp);
        downloadImg(tmp);
      } else {
        res.API_ERROR('数据请求异常', 5001);
      }
    }
  );
}
app.get('/', function (req, res) {
  list(req, res);
});

// 异步执行函数，用于下载图片
async function downloadImg(list) {
  Promise.all(
    list.map(async item => {
      await download(item.bigImg, 'dist', { filename: item.title + '.jpg' });
      console.log(item.title + '......正在下载');
    })
  )
    .then(() => {
      console.log('Download complete');
    })
    .catch(err => {
      console.log(err);
    });
}
module.exports = app;
