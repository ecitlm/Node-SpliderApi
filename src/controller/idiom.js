const query = require('@/src/models/idiom/idiom');
const app = require('express')();

/**
 * GET /api/idiom
 * @summary 汉语词典数据
 * @description 汉语词典数据
 * @param {string}  word.query.required  - 关键字
 */
app.get('/', function (req, res) {
  query(req, res);
});
module.exports = app;
