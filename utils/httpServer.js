/*
 * @Author: ecitlm
 * @Date:   2017-11-30 21:34:14
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-04-16 22:28:28
 */
let http = require('http')
const querystring = require('querystring')

/**
 * http get网络请求封装
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */
function httpGet (host, data, path, status) {
  console.log('===================HttpGet=====================')
  let options = {
    host: host,
    port: 80,
    path: path + querystring.stringify(data),
    method: 'GET',
    encoding: null,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
    }
  }
  // 判断是否为https请求
  if (status) {
    http = require('https')
    options.port = 443
  }

  return new Promise(function (resolve, reject) {
    let body = ''
    let getReq = http.request(options, function (response) {
      // response.setEncoding('utf8');
      response.on('data', function (chunk) {
        body += chunk
      })

      response.on('end', () => {
        resolve(body)
      })

      response.on('error', err => {
        reject(err)
      })
    })
    getReq.end()
  })
}

/**
 * http ajaxget网络请求封装
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */
function ajaxGet (host, data, path, status) {
  console.log('===================HttpGet=====================')
  let options = {
    host: host,
    port: 80,
    path: path + querystring.stringify(data),
    method: 'GET',
    encoding: null,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Connection: 'keep-alive',
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
    }
  }
  // 判断是否为https请求
  if (status) {
    http = require('https')
    options.port = 443
  }

  return new Promise(function (resolve, reject) {
    let body = ''
    let getReq = http.request(options, function (response) {
      // response.setEncoding('utf8');
      response.on('data', function (chunk) {
        body += chunk
      })

      response.on('end', () => {
        resolve(body)
      })

      response.on('error', err => {
        reject(err)
      })
    })
    getReq.end()
  })
}

/**
 * httpMobileGet  get网络请求封装
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */
function httpMobileGet (host, data, path, status) {
  console.log('===================httpMobileGet=====================')
  let options = {
    host: host,
    port: 80,
    path: path + querystring.stringify(data),
    method: 'GET',
    encoding: null,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'
    }
  }
  // 判断是否为https请求
  if (status) {
    http = require('https')
    options.port = 443
  }

  return new Promise(function (resolve, reject) {
    let body = ''
    let getReq = http.request(options, function (response) {
      // response.setEncoding('utf8');
      response.on('data', function (chunk) {
        body += chunk
      })

      response.on('end', () => {
        resolve(body)
      })

      response.on('error', err => {
        reject(err)
      })
    })
    getReq.end()
  })
}

/**
 * http POST 请求
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */
function httpPost (host, data, path, status) {
  data = querystring.stringify(data)
  console.log('---------httpPost---------------')
  console.log(data)
  let options = {
    host: host,
    port: '80',
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36',
      'Content-Length': Buffer.byteLength(data) // 返回字符串实际占据的字节长度
    }
  }
  // 判断是否为https请求
  if (status) {
    http = require('https')
    options.port = 443
  }
  return new Promise(function (resolve, reject) {
    let body = ''
    let postReq = http.request(options, function (response) {
      // console.log(response.statusCode);
      response.on('data', function (chunk) {
        body += chunk
      })

      response.on('end', () => {
        resolve(body)
      })

      response.on('error', err => {
        reject(err)
      })
    })

    postReq.write(data)
    postReq.end()
  })
}
module.exports = {
  httpGet,
  httpPost,
  httpMobileGet,
  ajaxGet
}
