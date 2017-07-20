/*
 * @Author: ecitlm 
 * @Date: 2017-06-19 14:50:54 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-07-20 10:09:15
 */

const express = require('express');
const http = require('http');
const app = express();
const router = express.Router();


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

/**路由列表**/
const index = require('./index');
const classify = require('./routes/picture/classify');
const classify_tags_list = require('./routes/picture/classify_tags_list');
const list = require('./routes/picture/list');
const img_view = require('./routes/picture/img_view');
const daily_list = require('./routes/web_daily/daily_list');
const recommend_list = require('./routes/web_daily/recommend');
const one_day_list = require('./routes/web_daily/one_day_list');
const web_frame = require('./routes/web_frame/hot_frame');
const zhihu_news = require('./routes/zhihu_daily/zhihu_news');
const zhihu_news_detail = require('./routes/zhihu_daily/news_detail');

app.use('/', index);
//图片列表
app.use('/huaban', require('./routes/picture/huaban'));
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
app.use('/zhihu_news', zhihu_news);
app.use('/zhihu_news_detail', zhihu_news_detail);

//新闻头条
app.use('/news_list', require('./routes/news_toutiao/news_list'));
app.use('/news_detail', require('./routes/news_toutiao/news_detail'));
app.use('/video_list', require('./routes/news_toutiao/video_list'));

//music router
app.use('/music_list', require('./routes/music/music_list'));
app.use('/new_songs', require('./routes/music/new_songs'));
app.use('/rank_list', require('./routes/music/rank_list'));
app.use('/rank_info_list', require('./routes/music/rank_info_list'));
app.use('/plist', require('./routes/music/plist'));
app.use('/plist_music', require('./routes/music/plist_music'));
app.use('/music_info', require('./routes/music/music_info'));

//joke
app.use('/joke_pic', require('./routes/joke/joke_pic'));
app.use('/joke', require('./routes/joke/joke'));

//weather
app.use('/weather', require('./routes/weather/weather'));

app.use('/post_test', require('./routes/untils/post_test'));
app.use(router);
app.listen(3000);
console.log(3000);