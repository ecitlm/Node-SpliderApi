const dayjs = require('dayjs');
const starDetail = require('./ORM');
const request = require('@/src/utils/request');
//
function spiderData(req, res) {
  let host = 'web.juhe.cn';
  let path = '/constellation/getAll?';
  let data = {
    consName: req.query.consName,
    key: 'a8f4e872b83a4bc901cf1ff42f2dcd83'
  };
  request
    .httpGet({ host, data, path, https: true })
    .then(function (body) {
      body = JSON.parse(body);
      if (body.resultcode === '200') {
        res.API(body);
        createDB(body, req);
      } else {
        res.API_ERROR('验证未通过', 300);
      }
    })
    .catch(function (err) {
      res.API_ERROR('网络好像有点问题', 400);
      console.log(err);
    });
}
async function queryDetail(req, res) {
  const data = await starDetail
    .findOne({
      where: {
        date: dayjs().format('YYYY-MM-DD'),
        consName: req.query.consName
      },
      attributes: ['date', 'consName', 'year', 'today', 'month', 'week', 'tomorrow'] //返回特定字段
    })
    .catch(err => {
      console.log(err);
    });
  if (data) {
    data.year = JSON.parse(data.year);
    data.month = JSON.parse(data.month);
    data.week = JSON.parse(data.week);
    data.today = data.today && JSON.parse(data.today);
    data.tomorrow = data.tomorrow && JSON.parse(data.tomorrow);
    res.API(data);
  } else {
    spiderData(req, res);
  }
}

function createDB(resData, req) {
  let data = {
    today: JSON.stringify(resData.today),
    tomorrow: JSON.stringify(resData.tomorrow),
    week: JSON.stringify(resData.week),
    month: JSON.stringify(resData.month),
    year: JSON.stringify(resData.year),
    date: dayjs().format('YYYY-MM-DD'),
    consName: req.query.consName
  };
  return starDetail.create(data);
}

module.exports = queryDetail;
