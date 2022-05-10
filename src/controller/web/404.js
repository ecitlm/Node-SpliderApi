'use strict';
const app = require('express')();
app.get('*', function (req, res) {
  res.render('web/404.html', {
    title: '404'
  });
});
module.exports = app;
