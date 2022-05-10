const log4js = require('log4js');
log4js.configure({
  replaceConsole: true,
  // pm2: true,
  appenders: {
    stdout: {
      //控制台输出
      type: 'console'
    },
    req: {
      //请求转发日志
      type: 'dateFile', //指定日志文件按时间打印
      filename: 'logs/reqlog/req', //指定输出文件路径
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    err: {
      //错误日志
      type: 'dateFile',
      filename: 'logs/errlog/err',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    oth: {
      //其他日志
      type: 'dateFile',
      filename: 'logs/othlog/oth',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    //appenders:采用的appender,取appenders项,level:设置级别
    default: {
      appenders: ['stdout', 'req'],
      level: 'debug'
    },
    err: {
      appenders: ['stdout', 'err'],
      level: 'error'
    }
  }
});

exports.getLogger = function (name) {
  //name取categories项
  return log4js.getLogger(name || 'default');
};
//用来与express结合
exports.useLogger = function (app, logger) {
  app.use(
    log4js.connectLogger(logger || log4js.getLogger('default'), {
      //自定义输出格式
      format:
        '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'
    })
  );
};

// 打印debug级别的日志信息:
//   logger.info('req的值是:' + req);
// 打印error级别的日志信息:
//   errLog.error(e);
