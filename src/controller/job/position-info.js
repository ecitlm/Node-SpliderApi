const cheerio = require('cheerio');
const app = require('express')();
const request = require('request');
const Iconv = require('iconv-lite');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

function list(req, res) {
  // let positionId = parseInt(req.params.positionId);
  let url = 'https://m.lagou.com/wn/jobs/10426927.html?deliverFrom=JOBLIST_DELIVERY';
  let headers = {
    connection: 'keep-alive',
    Cookie:
      '__cfduid=d34c02daf3555deb8443c4202ca0ca7d41511794384; gif-click-load=off; _ga=GA1.2.498763940.1511794387; _gid=GA1.2.1281594283.1512647401',
    accept:
      'text/html, application/xhtml+xml, application/xml; q=0.9, image/webp,image/apng, */*;q=0.8',
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
  };
  request(
    {
      url: url,
      encoding: null,
      headers: headers,
      timeout: 5000
    },
    function (error, response, body) {
      if (response && response.statusCode === 200) {
        body = Iconv.decode(body, 'utf-8');
        console.log(body);
        $ = cheerio.load(body);
        let data = {
          title: $('title').text(),
          publishtime: $('.publish_time').text(),
          job: $('.job-name').find('.name').text(),
          salary: $('.ceil-salary').text(),
          workyear: $('.salary').next('span').next('span').text(),
          education: $('.salary').next('span').next('span').next('span').text(),
          workaddress: $('input[name="workAddress"]').val(),
          positionAddress: $('input[name="positionAddress"]').val(),
          temptation: $('.job-advantage').text(),
          content: entities.decode($('.job_bt').find('div').html())
        };
        console.log(data);
        res.API(data);
      } else {
        res.API_ERROR('接口请求异常', 500);
      }
    }
  );
}

app.get('/:positionId', function (req, res) {
  list(req, res);
});
module.exports = app;
