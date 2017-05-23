//依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');
var async = require('async');

// 目标网址
var url = 'https://my.oschina.net/u/2921900/home?type=tweet&scope=entity&temp=1495528630941';

// 本地存储目录
var dir = './吕不懂';

// 图片链接地址
var links = [];
var titles = [];

// 创建目录
mkdirp(dir, function (err) {
    if (err) {
        console.log(err);
    }
});


function forRquest(url) {

    // 发送请求
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $('.tweet-img img').each(function () {
                var src = $(this).attr('src');
                links.push(src);
                console.log(src)

            });


            // 每次只执行一个异步操作
            async.mapSeries(links, function (item, callback) {
                download(item, dir, new Date().getTime() + parseInt(10000 * Math.random()) + item.substr(-4, 4));
                console.log("--------------------------")
                callback(null, item);
            }, function (err, results) {
            });
        }
    });

}



for (var i = 1; i <= 4; i++) {
    var url = 'https://my.oschina.net/u/2921900/home?type=tweet&scope=entity&showme=NOTSHOW&p='+i+'&temp=1495528698486';
    forRquest(url)
}


// 下载方法
var download = function (url, dir, filename) {
    request.head(url, function (err, res, body) {
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};
