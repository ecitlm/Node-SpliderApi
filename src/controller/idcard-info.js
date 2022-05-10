const idCard = require('idcard');
const lunarCalendarFix = require('lunar-calendar-fix');
const app = require('express')();
const { query, validationResult } = require('express-validator');

/**
 * GET /api/idcard-info
 * @tags 卡类信息
 * @summary 身份证信息解析
 * @description 根据身份证号解析基本信息、包括省市区
 * @param {string}  cardNo.query.required  - 身份证号码
 */
app.get(
  '/',
  query('cardNo').isLength({ min: 18, max: 18 }).withMessage('cardNo格式错误'),
  (req, res) => {
    const err = validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
      return res.send({
        code: 1002,
        data: err.mapped(),
        msg: err.mapped().cardNo.msg
      });
    }

    let cardNo = req.query.cardNo;
    let cardInfo = idCard.info(cardNo);
    if (cardInfo && cardInfo.valid) {
      let birthday = cardInfo.birthday;
      const reg = /(\d{4})(\d{2})(\d{2})/;
      reg.test(birthday);
      const data = lunarCalendarFix.solarToLunar(RegExp.$1, RegExp.$2, RegExp.$3);
      cardInfo.zodiac = data.zodiac;
      cardInfo.GanZhiYear = data.GanZhiYear;
      cardInfo.nongli = `农历${data.lunarMonthName}${data.lunarDayName}日`;
    }
    res.API(cardInfo);
  }
);

module.exports = app;
