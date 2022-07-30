const query = require('@/src/models/poetry/tang300');
const app = require('express')();

/**
 * GET /api/tang300
 * @summary 唐诗300首
 * @description 唐诗300首
 * @param {string}  contents.query.required  - 关键字
 * @param {number}  page.query.required  - 页码
 */
app.get('/', async function (req, res) {
  if(!req.query.contents)   res.API_ERROR('请输入关键字', 300);
  await query(req, res);
});
module.exports = app;
