/*
 * @Author: ecitlm
 * @Date:   2017-12-01 11:23:08
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-07 10:23:51
 */
'use strict'
const md5 = require('md5')
const appkey = 'nodeapliderapi'

/**
 * [Exception_BadRequest 抛出异常请求错误]
 * @param {[type]} msg [错误消息]
 * @param {[type]} res [callback]
 */
function Exception_BadRequest(msg, res) {
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
var getSign = params => {
    for (var key in params) {
        if (!params[key]) {
            delete params[key]
        }
    }
    var keyArr = Object.keys(params).sort()
    var newObj = {}
    var Kstr = ''
    for (var i = 0; i < keyArr.length; i++) {
        newObj[keyArr[i]] = params[keyArr[i]]
        Kstr += keyArr[i] + '=' + params[keyArr[i]]
    }
    Kstr = Kstr + appkey
    return md5(Kstr)
}

/**
 * [simpleFilter 接口请求校验]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 */
function simpleFilter(req, res) {
    var params = {}
    params.sign = req.query.sign
    params.times = req.query.times

    if (!params.sign) {
        Exception_BadRequest('缺少参数sign', res)
        return false
    }
    if (!params.times) {
        Exception_BadRequest('缺少参数times', res)
        return false
    }
    return true
}

module.exports = {
    simpleFilter
}