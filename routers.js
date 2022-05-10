const arrRoutes = [
  {
    path: '/',
    component: './src/controller/web/index'
  },
  {
    path: '/api/bank-card',
    component: './src/controller/bank-card'
  },
  {
    path: '/api/jwt',
    component: './src/controller/jwt'
  },
  {
    path: '/api/wx-login',
    component: './src/controller/we-app/getUserInfo'
  },
  {
    path: '/api/icon-list',
    component: './src/controller/icon-list'
  },
  {
    path: '/api/idiom',
    component: './src/controller/idiom'
  },
  {
    path: '/api/star-detail',
    component: './src/controller/star-detail/star-detail'
  },
  {
    path: '/api/juhe-star-detail',
    component: './src/controller/star-detail/juhe-star-detail'
  },
  {
    path: '/api/idcard-info',
    component: './src/controller/idcard-info'
  },
  {
    path: '/api/lunar-calendar',
    component: './src/controller/lunar-calendar'
  },
  {
    path: '/api/university',
    component: './src/controller/university/university'
  },
  {
    path: '/api/history-today',
    component: './src/controller/history-today/history-today'
  },
  {
    path: '/api/history-today-detail',
    component: './src/controller/history-today/history-today-detail'
  },
  {
    path: '/api/down-img',
    component: './src/controller/down-img'
  },
  {
    path: '/api/tang300',
    component: './src/controller/tang300'
  },
  {
    path: '/api/music/new-songs',
    component: './src/controller/music/new-songs'
  },
  {
    path: '/api/music/rank-list',
    component: './src/controller/music/rank-list'
  },
  {
    path: '/api/rank-list-info',
    component: './src/controller/music/rank-list-info'
  },
  {
    path: '/api/music/search',
    component: './src/controller/music/search'
  },
  {
    path: '/api/music/plist',
    component: './src/controller/music/plist'
  },
  {
    path: '/api/music/song-lrc',
    component: './src/controller/music/song-lrc'
  },
  {
    path: '/api/music/plist-songs',
    component: './src/controller/music/plist-songs'
  },
  {
    path: '/api/music/song-info',
    component: './src/controller/music/song-info'
  },
  {
    path: '/api/music/singer-info',
    component: './src/controller/music/singer-info'
  },
  {
    path: '/api/music/singer-list',
    component: './src/controller/music/singer-list'
  },
  {
    path: '/api/music/singer-classify',
    component: './src/controller/music/singer-classify'
  },
  {
    path: '/api/job/lagou-positionsearch',
    component: './src/controller/job/lagou-positionsearch'
  },
  {
    path: '/api/job/position-info',
    component: './src/controller/job/position-info'
  },
  {
    path: '/api/163/joke',
    component: './src/controller/163/joke'
  },
  {
    path: '/api/163/video-list',
    component: './src/controller/163/video-list'
  },
  {
    path: '/api/163/video-detail',
    component: './src/controller/163/video-detail'
  },
  {
    path: '/api/tt-news-list',
    component: './src/controller/163/tt-news-list'
  },
  {
    path: '/api/tt-news-detail',
    component: './src/controller/163/tt-news-detail'
  },
  {
    path: '*',
    component: './src/controller/web/404'
  }
];
module.exports = arrRoutes;
