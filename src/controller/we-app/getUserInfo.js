const app = require('express')();
const request = require('@/src/utils/request');
const queryUser = require('@/src/models/we-app/wx-login');

/**
 * 获取用户信息
 * @param req
 * @param res
 */
function getUserInfo(req, res) {
  let host = 'api.weixin.qq.com';
  let path = '/sns/jscode2session?';
  let data = {
    appid: process.env.appid, //自己小程序后台管理的appid，可登录小程序后台查看
    secret: process.env.secret, //小程序后台管理的secret，可登录小程序后台查看
    grant_type: 'authorization_code', // 授权（必填）默认值
    js_code: req.query.code //获取小程序传来的code
  };
  request
    .httpGet({ host, data, path, https: true })
    .then(function (body) {
      console.log(body);
      body = JSON.parse(body);
      let openid = body.openid; // 得到openid
      let sessionKey = body.session_key; // 得到session_key
      if (body.errcode) {
        res.send({
          code: 1003,
          data: body,
          msg: '请求失败'
        });
      } else {
        queryUser(req, res, sessionKey, openid);
      }
    })
    .catch(function (err) {
      console.log(err);
      return res.send({
        code: 400,
        msg: '网络好像有点问题'
      });
    });
}
/**
 * GET /api/getUserInfo
 * @tags 用户
 * @summary 获取微信用户信息
 * @description 获取微信用户信息
 * @param {string}  code.query.required  -  微信wx.login code
 */
app.get('/', (req, res) => {
  //const params = req.query;
  getUserInfo(req, res);
});

module.exports = app;
