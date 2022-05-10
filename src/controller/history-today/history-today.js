const queryList = require('@/src/models/history-today/history-today');
const app = require('express')();
const { validationResult, check } = require('express-validator');
const validator = [
  check('date').isLength({ min: 5, max: 5 }).withMessage('日期参数格式错误：mm-dd')
];
/**
 * GET /api/history-today
 * @tags 历史的今天
 * @summary 历史上的今天列表
 * @description 历史上的今天列表
 * @param {string}  date.query.required  - 12-31
 */
app.get('/', ...validator, (req, res) => {
  let err = validationResult(req);
  console.log(err);
  if (!err.isEmpty()) {
    return res.API_ERROR(err.mapped().date.msg, 1002, err.mapped());
  } else {
    return queryList(req, res);
  }
});
module.exports = app;
