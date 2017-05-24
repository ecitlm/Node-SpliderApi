const express = require('express');
const http = require('http');
const app = express();
var router = express.Router();


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/**路由列表**/
var list = require('./routers/picture/list');
var img_view = require('./routers/picture/img_view');
var daily_list = require('./routers/web_daily/daily_list');
var recommend_list = require('./routers/web_daily/recommend');
var one_day_list = require('./routers/web_daily/one_day_list');

//图片列表
app.use('/list', list);
app.use('/img_view', img_view);

//前端日报
app.use('/daily_list', daily_list);
app.use('/recommend_list', recommend_list);
app.use('/one_day_list', one_day_list);


app.use(router);
app.listen(3000);
console.log(3000);











