const APISign = require('@/src/utils/api-sign');
module.exports = function (req, res, next) {
  console.log(process.env.NODE_ENV);
  // 对非API地址放行
  if (req.path.indexOf('api/') < 0) {
    return next();
  }

  // 获取请求头信息、作为签名参数
  const headerInfo = {
    sign: req.headers['sign'],
    timestamp: req.headers['timestamp']
  };
  console.log(req.path);
  if (!APISign(headerInfo)) {
    return res.status(400).API_ERROR('非法请求,您的IP已被记录,请谨慎操作', 1003);
  }
  next();
};
