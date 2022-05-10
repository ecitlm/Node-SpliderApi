const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  info: {
    version: '1.0.0',
    title: 'v-tools-server接口文档',
    description:
      '基于node+express爬虫 API接口项目,包括全国高校信息、成语诗歌、星座运势、历史的今天、音乐数据接口、图片壁纸、搞笑视频、热点新闻资讯 详情接口数据'
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic'
    }
  },
  filesPattern: ['../controller/**/*.js'], // Glob pattern to find your jsdoc files
  swaggerUIPath: '/api-docs', // SwaggerUI will be render in this url. Default: '/api-docs'
  baseDir: __dirname
};

module.exports = function (app) {
  expressJSDocSwagger(app)(options);
};
