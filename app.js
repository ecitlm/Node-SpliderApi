require('module-alias/register');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const router = express.Router();
require('dotenv').config({
  override: true,
  path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`)
});
console.log(process.env.ApiSign);
const interceptor = require('@/src/middlewares/interceptor');
const resAPI = require('@/src/middlewares/resAPI');
require('./src/utils/swaggerUI')(app);
// 设置静态资源地址
app.use('/public', express.static('public'));
app.use('/docs', express.static('docs'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const arrRoutes = require('./routers');
app.get('/favicon.ico', (req, res) => res.end());
app
  .set('view engine', 'ejs')
  // .set('views', path.join(__dirname, 'src/views'))
  .engine('html', require('ejs').__express);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.use的使用顺序需要注意

// 接口返回封装
app.use(resAPI);
// 请求拦截处理
app.use(interceptor);

for (const route of arrRoutes) {
  app.use(route.path, require(route.component));
}
app.use(router);
app.listen(3001, () => {
  console.log('Web server started at port 3001!');
});
module.exports = app;
