/**
 * 重载接口返回格式封装
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.API = (data, msg = 'success') => {
    let json = {
      msg: msg,
      data: data,
      code: 200,
      ip
    };
    return res.json(json);
  };

  res.API_ERROR = (msg, code, data = null) => {
    let json = {
      msg,
      data,
      code,
      ip
    };
    return res.json(json);
  };
  next();
};
