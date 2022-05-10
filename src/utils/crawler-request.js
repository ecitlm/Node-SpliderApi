const request = require('request');
const Iconv = require('iconv-lite');
const cheerio = require('cheerio');
const log4js = require('./log4.js');
const errLog = log4js.getLogger('err');

/**
 * 页面爬虫方法
 * @param url
 * @param headers
 * @param req
 * @param res
 * @returns {Promise}
 */
function crawlerRequest({ url, headers, req, res }) {
  return new Promise((resolve, reject) => {
    let defaultHeaders = {
      Connection: 'keep-alive',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
    };
    request(
      {
        url: url,
        encoding: null,
        headers: Object.assign({}, defaultHeaders, headers)
      },
      function (error, response, body) {
        if (response && response.statusCode === 200) {
          body = Iconv.decode(body, 'utf-8');
          let $ = cheerio.load(body);
          resolve($);
        } else {
          errLog.error(url, headers, req, res);
          reject(error);
        }
      }
    );
  });
}
module.exports = crawlerRequest;
