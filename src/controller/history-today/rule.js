/**
 * 参数验证规则
 */
const { check } = require('express-validator');
exports.detailRule = [
  check('date', '日期参数格式错误：mm-dd').isLength({ min: 5, max: 5 }),
  check('content_id', 'content_id上送错误')
    .isInt({ gt: 0, lt: 100000 })
    .isLength({ min: 1, max: 7 })
    .isInt()
];
