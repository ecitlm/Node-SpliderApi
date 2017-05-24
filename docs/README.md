## Splider
基于Node 的一个网络爬虫 API接口


### 环境要求
需要 NodeJS 6.0+ 环境

### 安装
``` shell
$ git clone https://git.oschina.net/ecitlm/splider
$ npm install
```
### 运行
``` shell
$ node app.js
```
服务器启动默认端口为3000 、启动之后就可以开启了接口服务了.


[TOC]

### 1.前端开发日报接口
说明:获取前端开发博客日报列表、推荐列表、单日文章列表数据

#### 1.1 最新10天日报列表
**必选参数:**
无

**接口地址:**
`/daily_list`

**调用例子:**
`http://localhost:3000/daily_list`

返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:
```
{
    "msg": "success",
    "data": [
        {
            "title": "20170522 前端开发日报",
            "id": 20170522,
            "description": "前端 (Not just) 工程师终究要掌握的知识；css3动画（二）：波浪效果；JS 与多线程；每天 10 个前端知识点：杂技；GB-respond：移动端响应式布局解决方案（JavaScript + rem）；React实战 ̵ ...",
            "date": "2017-05-23",
            "url": "http://caibaojian.com/fe-daily-20170522.html"
        },
        {
            "title": "20170513 前端开发日报",
            "id": 20170513,
            "description": "[Vue]精致完整的Vue项目-douban；关于Node.js的__dirname，__filename，process.cwd()，./文件路径的一些坑；javaScript代码优化；Gulp & webpack 配置详解；Re ...",
            "date": "2017-05-14",
            "url": "http://caibaojian.com/fe-daily-20170513.html"
        }
    ],
    "code": 1
}
```

#### 1.2 内容推荐列表
**必选参数:**
无

**接口地址:**
`/recommend_list`

**调用例子:**
`http://localhost:3000/recommend_list`

返回数据(每次返回10条数据，由于长度就展示2条看)如下JSON:
```
{
    "msg": "success",
    "data": [
        {
            "title": "长连接、短连接、长轮询和WebSocket",
            "id": null,
            "description": "对这四个概念不太清楚，今天专门搜索了解一下，总结一下： 长连接：在HTTP 1.1，客户端发出请求，服务端接收请求，双方建立连接，在服务端没有返回之前保持连接，当客户端再发送请求时，它会使用同一个连接。这一直继续到客户端或服务器端认为会话已经结束，其中一方中断连接。",
            "date": "2017-03-01",
            "url": "http://caibaojian.com/http-connection-and-websocket.html"
        },
        {
            "title": "jquery圆环进度条插件",
            "id": null,
            "description": "在网络搜到的一个jquery圆环进度条插件，是使用Canvas写的，支持纯色、渐变颜色、支持文字逐渐变化、支持定义起始角等一切跟之前我写过的HTML5 Canvas绘制矩形和圆形（圆弧）和canvas绘制旋转的圆环百分比进度条等一切圆弧的属 ...",
            "date": "2015-06-04",
            "url": "http://caibaojian.com/jquery-circle-progress.html"
        }
    ],
    "code": 1
}
```

#### 1.3 单日日报内容
**必选参数:**
`date`: 日期 20170522

**接口地址:**
`/one_day_list?date=20170521`

**调用例子:**
`http://localhost:3000/one_day_list?date=20170521`

返回数据(由于长度就展示2条看)如下JSON:
```
{
    "msg": "success",
    "data": {
        "title": "20170521 前端开发日报",
        "description": "总有你要的编程书单（GitHub）；JavaScript 编码指南；学习JavaScript之闭包；Vue 用户的 React 上手小结；初识weex（前端视角） – 环境搭建；JQuery 中的 setTimeout(fn, 0) 的作用；如何将Angular文档化？；Visual Studio Code 前端调试不完全指南",
        "links": [
            {
                "title": "总有你要的编程书单（GitHub）",
                "description": "总有你要的编程书单（GitHub） 一些 GitHub 上不错的文章或电子书列表与大家分享。不乏有不少经典，可以收起来慢慢阅览。 —— 由IT程序狮分享",
                "url": "https://juejin.im/entry/5920f4f0a0bb9f005f4d9535"
            },
            {
                "title": "ReactNative 学习资源大汇集",
                "description": "ReactNative 学习资源大汇集 - 世锋日上 - 掘金专栏  ​​​",
                "url": "http://t.cn/RaBIMy2"
            }
        ]
    },
    "code": 1
}

```



### 2.妹纸图片福利接口
说明:获取图片列表数据、和某个妹纸图片集合

#### 2.1 妹纸图片列表接口
**必选参数:**
`page` : 页码 1

**接口地址:**
`/list?page=2`

**调用例子:**
`http://localhost:3000/list?page=1`

返回数据(每页返回30条 由于长度就展示2条看)如下JSON:
```
{
    "msg": "success",
    "data": [
        {
            "img": "http://mm.howkuai.com/wp-content/uploads/2017a/04/18/limg.jpg",
            "title": "<b>评一评，你觉得哪个妹纸最打动你的心？</b>",
            "url": "http://www.meizitu.com/a/5530.html",
            "id": 5530
        },
        {
            "img": "http://mm.howkuai.com/wp-content/uploads/2016a/04/10/limg.jpg",
            "title": "妹子你是咖啡馆里最美的风景线",
            "url": "http://www.meizitu.com/a/5350.html",
            "id": 5350
        }
    ],
    "code": 1
}
```

#### 2.2 图片详情列表
**必选参数:**
`id` :  列表下图片集合id  5525

**接口地址:**
`/img_view?id=5525`

**调用例子:**
`http://localhost:3000/img_view?id=5525`

返回数据如下JSON:
```
{
    "msg": "success",
    "data": [
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/01.jpg",
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/02.jpg",
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/03.jpg",
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/04.jpg",
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/05.jpg"
    ],
    "code": 1
}
```


