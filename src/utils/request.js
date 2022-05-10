let http = require('http');
const querystring = require('query-string');

/**
 * Request 模拟请求封装
 */
class Request {
  static PromiseData(options) {
    return new Promise(function (resolve, reject) {
      let body = '';
      let getReq = http.request(options, function (response) {
        response.on('data', function (chunk) {
          body += chunk;
        });
        response.on('end', () => {
          resolve(body);
        });
        response.on('error', err => {
          reject(err);
        });
      });
      getReq.end();
    });
  }
  static httpGet(config) {
    const header = config.headers || {};
    let options = {
      host: config.host,
      port: 80,
      path: config.path + querystring.stringify(config.data),
      method: 'GET',
      encoding: null,
      headers: {
        // 'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
      }
    };
    options.headers = Object.assign({}, options.headers, header);
    console.log(options);
    // 判断是否为https请求
    if (config.https) {
      http = require('https');
      options.port = 443;
    }
    return this.PromiseData(options);
  }

  static ajaxGet(host, data, path, status) {
    console.log('===================HttpGet=====================');
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
    };
    // 判断是否为https请求
    if (status) {
      http = require('https');
      options.port = 443;
    }
    return this.PromiseData(options);
  }

  static httpMobileGet(host, data, path, status) {
    console.log('===================httpMobileGet=====================');
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
    };
    // 判断是否为https请求
    if (status) {
      http = require('https');
      options.port = 443;
    }
    return this.PromiseData(options);
  }

  static httpPost({ host, data, path, status, headers = {} }) {
    console.log(headers);
    // data = querystring.stringify(data);
    console.log('---------httpPost---------------');
    console.log(data);
    let options = {
      host: host,
      port: '80',
      path: path,
      formData: data,
      method: 'post',
      headers: Object.assign(
        {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36'
          // 'Content-Length': Buffer.byteLength(data) // 返回字符串实际占据的字节长度
        },
        headers
      )
    };
    // 判断是否为https请求
    if (status) {
      http = require('https');
      options.port = 443;
    }
    console.log(options);
    return this.PromiseData(options);
  }
}

module.exports = Request;
