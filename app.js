/* 
* @Author: ecitlm
* @Date:   2017-05-23 17:59:30
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-06-11 21:58:56
*/
const express = require('express');
const http = require('http');
const app = express();
const router = express.Router();


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/**路由列表**/
const index               = require('./index');
const classify            = require('./routers/picture/classify');
const classify_tags_list  = require('./routers/picture/classify_tags_list');
const list                = require('./routers/picture/list');
const img_view            = require('./routers/picture/img_view');
const daily_list          = require('./routers/web_daily/daily_list');
const recommend_list      = require('./routers/web_daily/recommend');
const one_day_list        = require('./routers/web_daily/one_day_list');
const web_frame           = require('./routers/web_frame/hot_frame');
const zhihu_news          = require('./routers/zhihu_daily/zhihu_news');
const zhihu_news_detail   = require('./routers/zhihu_daily/news_detail');

app.use('/', index);
//图片列表
app.use('/huaban', require('./routers/picture/huaban'));
app.use('/classify', classify);
app.use('/classify_tags_list', classify_tags_list);
app.use('/list', list);
app.use('/img_view', img_view);

//前端日报
app.use('/daily_list', daily_list);
app.use('/recommend_list', recommend_list);
app.use('/one_day_list', one_day_list);
app.use('/web_frame', web_frame);

//知乎日报
app.use('/zhihu_news',zhihu_news);
app.use('/zhihu_news_detail',zhihu_news_detail);

//新闻头条
app.use('/news_list', require('./routers/news_toutiao/news_list'));
app.use('/news_detail', require('./routers/news_toutiao/news_detail'));
app.use('/video_list', require('./routers/news_toutiao/video_list'));




//music router
app.use('/music_list', require('./routers/music/music_list'));



app.use('/test', require('./routers/untils/test'));
app.use('/post_test', require('./routers/untils/post_test'));
app.use(router);
app.listen(3000);
console.log(3000);











