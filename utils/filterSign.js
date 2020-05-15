/*
 * @Author: ecitlm
 * @Date:   2017-12-01 11:23:08
 * @Last Modified by: ecitlm
 * @Last Modified time: 2020-05-15 21:31:50
 */
'use strict'
const md5 = require('md5')
const appkey = 'nodeapliderapi'

/**
 * [Exception_BadRequest 抛出异常请求错误]
 * @param {[type]} msg [错误消息]
 * @param {[type]} res [callback]
 */
function ExceptionBadRequest (msg, res) {
  res.send({
    code: 2,
    msg: msg
  })
  return false
}

/**
 *  将参数按照字典排序等到签名sign
 * @param {object} params  参数集合
 */
const getSign = params => {
  for (const key in params) {
    if (!params[key]) {
      delete params[key]
    }
  }
  const keyArr = Object.keys(params).sort()
  const newObj = {}
  let Kstr = ''
  for (let i = 0; i < keyArr.length; i++) {
    newObj[keyArr[i]] = params[keyArr[i]]
    Kstr += keyArr[i] + '=' + params[keyArr[i]]
  }
  Kstr = Kstr + appkey
  return md5(Kstr)
}
console.log(getSign)

/**
 * [simpleFilter 接口请求校验]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 */
function simpleFilter (req, res) {
  const params = {}
  params.sign = req.query.sign
  params.times = req.query.times

  if (!params.sign) {
    ExceptionBadRequest('缺少参数sign', res)
    return false
  }
  if (!params.times) {
    ExceptionBadRequest('缺少参数times', res)
    return false
  }
  return true
}

module.exports = {
  simpleFilter
}
