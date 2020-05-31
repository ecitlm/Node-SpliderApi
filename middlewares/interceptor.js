const openPath = require('./openPath')
module.exports = function (req, res, next) {
  console.log(req.path, req.originalUrl, req.baseUrl)
  if (!req.cookies.token && openPath.indexOf(req.path) < 0) {
    res.send({
      code: 201,
      data: '',
      msg: '会话超时、请重新登录！'
    })
  } else {
    next()
  }
}
