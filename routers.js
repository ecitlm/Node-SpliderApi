/**
 * author：by ecitlm
 * Date: on 2020-04-19
 */
const arrRoutes = [
  {
    path: '/',
    component: './routes/web/index'
  },
  {
    path: '/api/photo_type',
    component: './routes/api/photo/photo_type'
  },
  {
    path: '/api/huaban',
    component: './routes/api/photo/huaban'
  },
  {
    path: '/api/photo_list',
    component: './routes/api/photo/photo_list'
  },
  {
    path: '/api/photo_view',
    component: './routes/api/photo/photo_view'
  },
  {
    path: '/api/rank_list',
    component: './routes/api/music/rank_list'
  },
  {
    path: '/api/rank_list_info',
    component: './routes/api/music/rank_list_info'
  },
  {
    path: '/api/song_info',
    component: './routes/api/music/song_info'
  },
  {
    path: '/api/song_lrc',
    component: './routes/api/music/song_lrc'
  },
  {
    path: '/api/plist',
    component: './routes/api/music/plist'
  },
  {
    path: '/api/plist_songs',
    component: './routes/api/music/plist_songs'
  },
  {
    path: '/api/new_songs',
    component: './routes/api/music/new_songs'
  },
  {
    path: '/api/singer_classify',
    component: './routes/api/music/singer_classify'
  },
  {
    path: '/api/singer_list',
    component: './routes/api/music/singer_list'
  },
  {
    path: '/api/singer_info',
    component: './routes/api/music/singer_info'
  },
  {
    path: '/api/music_search',
    component: './routes/api/music/search'
  },
  {
    path: '/api/web_frame',
    component: './routes/api/it/web_frame'
  },
  {
    path: '/api/daily_list',
    component: './routes/api/it/daily_list'
  },
  {
    path: '/api/daily_info',
    component: './routes/api/it/daily_info'
  },
  {
    path: '/api/joke_list',
    component: './routes/api/joke/joke_list'
  },
  {
    path: '/api/joke_img',
    component: './routes/api/joke/joke_img'
  },
  {
    path: '/api/joke_photo',
    component: './routes/api/joke/joke_photo'
  },
  {
    path: '/api/jandan',
    component: './routes/api/photo/jandan'
  },
  {
    path: '/api/news_list',
    component: './routes/api/news/news_list'
  },
  {
    path: '/api/video_list',
    component: './routes/api/news/video_list'
  },
  {
    path: '/api/news_detail',
    component: './routes/api/news/news_detail'
  },
  {
    path: '/api/job_list',
    component: './routes/api/job/job_list'
  },
  {
    path: '/api/job_info',
    component: './routes/api/job/job_info'
  },
  {
    path: '/web/daily_list',
    component: './routes/web/daily_list'
  },
  {
    path: '/web/daily_info',
    component: './routes/web/daily_info'
  },
  {
    path: '/web/photo',
    component: './routes/web/photo'
  },
  {
    path: '/web/jandan',
    component: './routes/web/jandan'
  },
  {
    path: '/web/login',
    component: './routes/web/login'
  },
  {
    path: '/web/loginApi',
    component: './routes/web/loginApi'
  },
  {
    path: '*',
    component: './routes/web/404'
  }
]
module.exports = arrRoutes
