const universityQuery = require('@/src/models/university/university');
const { universityRule } = require('./rule');
const { validationResult } = require('express-validator');

const app = require('express')();

/**
 * GET /api/university
 * @summary 全国高校信息
 * @description 全国高校信息
 * @param {string}  type.query.required  -  类型 985|211|一流大学｜一流学科
 * @param {string}  schoolname.query  -  学校名称
 */
app.get('/', universityRule, (req, res) => {
  // 参数验证抛错
  let err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    return res.send({
      code: 1002,
      data: err.mapped(),
      msg: msg
    });
  }
  return universityQuery(req, res);
});
module.exports = app;
