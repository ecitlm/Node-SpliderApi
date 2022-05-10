const app = require('express')();
const queryDetail = require('@/src/models/history-today/history-today-detail');
const { validationResult } = require('express-validator');
const { detailRule } = require('./rule');

/**
 * GET /api/history-today-detail
 * @summary 历史上的今天列表
 * @tags 历史的今天
 * @description 历史上的今天列表
 * @param {string}  date.query.required  - 12-31
 * @param {string}  content_id.query.required  -  详情id 12092
 */
app.get('/', detailRule, (req, res) => {
  let err = validationResult(req);
  if (!err.isEmpty()) {
    return res.API_ERROR(err.mapped().date && err.mapped().date.msg, 1002, err.mapped());
  } else {
    return queryDetail(req, res);
  }
});
module.exports = app;
