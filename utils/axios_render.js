/*
* @Author: ecitlm
* @Date:   2017-12-03 20:31:17
* @Last Modified by:   ecitlm
* @Last Modified time: 2017-12-03 20:47:19
*/
var axios = require('axios');
var qs = require('qs');
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:3001';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    alert("错误的传参")
    return Promise.reject(error);
});
function ajax(url,params){
	 return new Promise((resolve, reject) => {
            axios.get(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
}

module.exports = {
   ajax
}