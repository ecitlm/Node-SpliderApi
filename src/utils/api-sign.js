/**
 * 1.时间戳拦截限制
 * 2.签名验证
 */
const md5 = require('md5');
const log4js = require('./log4');
const errLog = log4js.getLogger('err');
const ApiSign = function (data) {
  // 如果配置项不需要签名
  if (process.env.ApiSign === 'false') return true;
  // 签名判断逻辑
  const time = new Date().getTime() - data.timestamp;
  if (time > 120000) return false;
  const signStr = md5(`appKey=${process.env.appKey}timeStamp=${data.timestamp}`);
  if (signStr !== data.sign) {
    errLog.error(
      `签名报文：appKey=${process.env.appKey}timeStamp=${data.timestamp},signStr=${signStr}`
    );
    return false;
  }
  return true;
};

module.exports = ApiSign;
