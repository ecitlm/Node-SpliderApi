/*
 * @Author: ecitlm
 * @Date: 2017-12-06 16:20:03
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:10:37
 */
const express = require('express')
const app = express()
const router = express.Router()
app.use('/public', express.static('public')) // 设置静态资源地址
app.use('/docs', express.static('docs')) // 设置静态资源地址
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  next()
})
app.use('/', require('./routes/web/index'))
app.use('/api/photo_type', require('./routes/api/photo/photo_type'))
app.use('/api/huaban', require('./routes/api/photo/huaban'))
app.use('/api/photo_list', require('./routes/api/photo/photo_list'))
app.use('/api/photo_view', require('./routes/api/photo/photo_view'))
app.use('/api/rank_list', require('./routes/api/music/rank_list'))
app.use('/api/rank_list_info', require('./routes/api/music/rank_list_info'))
app.use('/api/song_info', require('./routes/api/music/song_info'))
app.use('/api/song_lrc', require('./routes/api/music/song_lrc'))
app.use('/api/plist', require('./routes/api/music/plist'))
app.use('/api/plist_songs', require('./routes/api/music/plist_songs'))
app.use('/api/new_songs', require('./routes/api/music/new_songs'))
app.use('/api/singer_classify', require('./routes/api/music/singer_classify'))
app.use('/api/singer_list', require('./routes/api/music/singer_list'))
app.use('/api/singer_info', require('./routes/api/music/singer_info'))
app.use('/api/music_search', require('./routes/api/music/search'))
app.use('/api/web_frame', require('./routes/api/it/web_frame'))
app.use('/api/daily_list', require('./routes/api/it/daily_list'))
app.use('/api/daily_info', require('./routes/api/it/daily_info'))
app.use('/api/joke_list', require('./routes/api/joke/joke_list'))
app.use('/api/joke_img', require('./routes/api/joke/joke_img'))
app.use('/api/joke_photo', require('./routes/api/joke/joke_photo'))
app.use('/api/jandan', require('./routes/api/photo/jandan'))
app.use('/api/news_list', require('./routes/api/news/news_list'))
app.use('/api/video_list', require('./routes/api/news/video_list'))
app.use('/api/news_detail', require('./routes/api/news/news_detail'))
app.use('/api/job_list', require('./routes/api/job/job_list'))
app.use('/api/job_info', require('./routes/api/job/job_info'))
// web
app.use('/web/daily_list', require('./routes/web/daily_list'))
app.use('/web/daily_info', require('./routes/web/daily_info'))
app.use('/web/photo', require('./routes/web/photo'))
app.use('/web/jandan', require('./routes/web/jandan'))
app.use(router)
app.listen(3001)
console.log('app start success port:3001')
module.exports = app
