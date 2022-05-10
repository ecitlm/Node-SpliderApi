const app = require('express')();
const crawlerRequest = require('@/src/utils/crawler-request');
/**
 * get /api/163/video-detail
 * @summary 视频详情
 * @tags 163
 * @description 视频详情
 * @param {string}  vid.query.required  -  视频id list接口中的vid
 */
app.get('/', function (req, res) {
  const vid = req.query.vid || 'VW4GNCU88';
  const url = `https://3g.163.com/v/video/${vid}.html?offset=46&ver=c`;
  crawlerRequest({ url })
    .then($ => {
      const detail = {
        title: $('title').text(),
        cover: $('.main_video').attr('poster'),
        mp4: $('.main_video').find('source').eq(0).attr('src'),
        mp3u8: $('.main_video').find('source').eq(1).attr('src'),
        author: $('.video_info .detail .source').text(),
        time: $('.video_info .detail .time').text()
      };
      res.API(detail);
    })
    .catch(err => {
      console.log(err, 222);
      res.API_ERROR('请求异常', 5001);
    });
});
module.exports = app;
