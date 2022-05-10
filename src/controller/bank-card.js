const app = require('express')();
const request = require('@/src/utils/request');

/**
 * GET /api/bank-card
 * @tags 卡类信息
 * @summary 根据银行卡号解析卡信息
 * @description 根据银行卡号解析卡信息
 * @param {string}  cardNo.query.required  -  card号
 */
app.get('/', function (req, res) {
  let cardNo = req.query.cardNo;
  if (!cardNo) {
    return res.API_ERROR('请输入卡号', 300);
  }
  let host = 'ccdcapi.alipay.com';
  let path = `/validateAndCacheCardInfo.json?cardNo=${cardNo}&cardBinCheck=true`;
  let data = {};
  // false:http请求  true:https请求
  request
    .httpGet({ host, data, path, https: true })
    .then(function (body) {
      body = JSON.parse(body);
      if (body.validated) {
        res.API(body);
      } else {
        res.API_ERROR('卡验证未通过', 300);
      }
    })
    .catch(function (err) {
      res.API_ERROR('网络好像有点问题', 400);
      console.log(err);
    });
});

module.exports = app;
