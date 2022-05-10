const queryDetail = require('@/src/models/star-detail/juhe-star-detail');
const app = require('express')();
// const apicache = require('apicache');
// let cache = apicache.middleware;
// cache('5 minutes'),
const { validationResult, check } = require('express-validator');
const rule = [check('consName').isLength({ min: 3, max: 3 }).withMessage('星座名称错误')];
/**
 * GET /api/juhe-star-detail
 * @summary 星座运势
 * @description 星座运势
 * @param {string}  consName.query.required  -  星座名称:白羊座
 */
app.get('/', ...rule, (req, res) => {
  let err = validationResult(req);
  if (!err.isEmpty()) {
    return res.send({
      code: 1002,
      data: err.mapped(),
      msg: err.mapped().consName.msg
    });
  } else {
    return queryDetail(req, res);
  }
});
module.exports = app;
