const lunarCalendarFix = require('lunar-calendar-fix');
const app = require('express')();
const { validationResult, check, matchedData } = require('express-validator');
const reg = /(\d{4})-(\d{2})-(\d{2})/;
/**
 * GET /api/lunar-calendar
 * @summary 黄历假日接口
 * @param {string}  date.query.required  - 年月日yyyy-mm-dd
 */
app.get('/', check('date', '请输入格式正确的日期格式：yyyy-mm-dd').matches(reg), (req, res) => {
  // 获取报错的数据
  let err = validationResult(req);

  // 获取匹配的数据
  let allData = matchedData(req);
  if (!err.isEmpty()) {
    return res.send({
      code: 1002,
      data: err.mapped(),
      msg: err.mapped().date.msg
    });
  }
  reg.test(allData.date);
  const data = lunarCalendarFix.solarToLunar(RegExp.$1, RegExp.$2, RegExp.$3);
  res.API(data);
});

module.exports = app;
