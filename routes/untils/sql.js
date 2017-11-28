var mysql = require('mysql'); //调用MySQL模块
//创建一个connection
var connection = mysql.createConnection({
    host: '127.0.0.1', //主机
    user: 'root', //MySQL认证用户名
    password: '',
    port: '3306',
    database: 'blog_cms',
    charset: 'UTF8_GENERAL_CI'
});


module.exports = connection