/*
 * @Author: ecitlm
 * @Date:   2017-12-03 20:31:17
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:18:22
 */
const axios = require('axios')
const qs = require('qs')
const instance = axios.create({
  baseURL: '',
  timeout: 60 * 1000
})

// POST传参序列化
instance.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    window.alert('错误的传参')
    return Promise.reject(error)
  }
)

function get (url, params) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, params)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

function post (url, params) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

module.exports = {
  get,
  post
}
