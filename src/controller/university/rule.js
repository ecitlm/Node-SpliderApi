/**
 * 参数验证
 */
const { check, validationResult } = require('express-validator');
exports.universityRule = [
  check('type', '参数格式错误：985|211|一流大学｜一流学科')
    .default('')
    .isLength({ min: 0, max: 6 })
    .isIn(['985', '211', '一流大学A类', '一流大学B类', '一流学科', '']),
  check('page', '分页数不符').default(1).isInt({ gt: 0 }).isLength({ min: 1, max: 3 }),
  check('schoolname', '院校名称').default('').isLength({ min: 0, max: 20 })
];
exports.ruleResult = (req, res) => {
  let err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    return res.send({
      code: 1002,
      data: err.mapped(),
      msg: msg
    });
  }
};
