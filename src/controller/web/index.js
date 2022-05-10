const app = require('express')();
app.get('/', function (req, res) {
  // res.header('Content-Type:text/html; charset=utf-8');
  res.render('index.html', {
    title: '欢迎使用'
  });
});

module.exports = app;
