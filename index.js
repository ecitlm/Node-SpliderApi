var express = require('express');
var app = express();
var ejs = require('ejs');


app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.set('views', './views'); //设置模板路径
//app.set('view engine', '.html');


//app.set('views', __dirname + 'views');

app.get('/', function(req, res) {
    // res.header("Content-Type:text/html; charset=utf-8");
    res.render('index', {
        title: '欢迎进入IT开发者--Nodejs云服务平台'
    });

});

module.exports = app