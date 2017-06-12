/*
 * @Author: ecitlm 
 * @Date: 2017-06-07 16:22:29 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-06-12 12:48:14
 */
const express = require('express')
var http = require('http')
const app = express()
const querystring = require("querystring");
const request = require("request");


/**
 * http get网络请求封装
 * @param {any} 域名 
 * @param {any} 参数 
 * @param {any} 接口路径 
 * @param {bool} true false 是否为https
 * @returns 
 */
function httpGet(host, data, path, status) {

    //var path=path+"&"+querystring.stringify(data);
    console.log("===================HttpGet=====================");
    var options = {
        host: host,
        port: 8097,
        path: path + querystring.stringify(data),
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36"
        }
    };
    //判断是否为https请求
    if (status) {
        http = require('https');
        options.port = 443
    }

    return new Promise(function (resolve, reject) {
        let body = "";
        var get_req = http.request(options, function (response) {
            response.on("data", function (chunk) {
                body += chunk;
            })

            response.on('end', () => {
                resolve(body)
            })

            response.on('error', err => {
                reject(err)
            })

        })

        get_req.end();

    });
}


/**
 * http POST 请求
 * @param {string} 域名 
 * @param {any} 参数 
 * @param {any} 接口路径 
 * @param {bool} true false 是否为https
 * @returns 
 */
function httpPost(host, data, path, status) {
    var data = querystring.stringify(data);
    console.log("---------httpPost---------------")
    console.log(data)
    var options = {
        host: '192.168.1.2',
        port: '8097',
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
            'Content-Length': Buffer.byteLength(data)
        }
    }
    //判断是否为https请求
    if (status) {
        http = require('https');
        options.port = 443
    }
    return new Promise(function (resolve, reject) {
        let body = "";
        var post_req = http.request(options, function (response) {
            response.on("data", function (chunk) {
                body += chunk;
            })

            response.on('end', () => {
                resolve(body)
            })

            response.on('error', err => {
                reject(err)
            })

        })

        post_req.write(data);
        post_req.end();
    })

}
module.exports = {
    httpGet,
    httpPost
}