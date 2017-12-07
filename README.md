# SplderApi2
__Node-SplderApi2 第二版__
>基于Node 的网络爬虫 API接口 包括前端开发日报、kugou音乐、前端top框架排行、妹纸福利、搞笑视频、段子笑话、各类视频新闻资讯 热点详情接口数据

__源代码目录结构__
__[地址](https://github.com/ecitlm/Node-SpliderApi/tree/splider2)__

<a href="https://ecitlm.github.io/SpliderApi/#/">查看文档</a>

![project.png](https://i.loli.net/2017/12/07/5a28ea5c3468d.png)


### 环境要求
>需要安装node express 

### 部署运行
```javascript
$ git clone https://github.com/ecitlm/Node-SpliderApi.git
$ npm install
### 运行
$ node app.js
```
服务器启动默认端口为3001 、启动之后就可以开启了接口服务了.


__接口文件__
```txt
├─api
│  ├─it
│  │      daily_info.js
│  │      daily_list.js
│  │      web_frame.js
│  │      
│  ├─joke
│  │      joke_img.js
│  │      joke_list.js
│  │      joke_photo.js
│  │      
│  ├─music
│  │      new_songs.js
│  │      plist.js
│  │      plist_songs.js
│  │      rank_list.js
│  │      rank_list_info.js
│  │      search.js
│  │      singer_classify.js
│  │      singer_info.js
│  │      singer_list.js
│  │      song_info.js
│  │      song_lrc.js
│  │      
│  ├─news
│  │      news_detail.js
│  │      news_list.js
│  │      video_list.js
│  │      
│  └─photo
│          huaban.js
│          photo_list.js
│          photo_type.js
│          photo_view.js
│          
└─web
        daily_info.js
        daily_list.js
        index.js
        photo.js
        

```

__网络请求封装 `httpServer.js`__

`get`方法
```javascript
/**
 * http get网络请求封装
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */
function httpGet(host, data, path, status) {
    var options = {
        host: host,
        port: 80,
        path: path + querystring.stringify(data),
        method: 'GET',
        encoding: null,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36',
        },
    };
    //判断是否为https请求
    if (status) {
        http = require('https');
        options.port = 443;
    }

    return new Promise(function(resolve, reject) {
        let body = '';
        var get_req = http.request(options, function(response) {
            //response.setEncoding('utf8');
            response.on('data', function(chunk) {
                body += chunk;
            });

            response.on('end', () => {
                resolve(body);
            });

            response.on('error', err => {
                reject(err);
            });
        });
        get_req.end();
    });
}
```

`POST`方法

```javascript
/**
 * http POST 请求
 * @param {string} 域名
 * @param {obj} 参数
 * @param {string} 接口路径
 * @param {bool} true false 是否为https
 * @returns
 */
function httpPost(host, data, path, status) {
    var data = querystring.stringify(data);
    var options = {
        host: host,
        port: '80',
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36',
            'Content-Length': Buffer.byteLength(data), //返回字符串实际占据的字节长度
        },
    };
    //判断是否为https请求
    if (status) {
        http = require('https');
        options.port = 443;
    }
    return new Promise(function(resolve, reject) {
        let body = '';
        var post_req = http.request(options, function(response) {
            //console.log(response.statusCode);
            response.on('data', function(chunk) {
                body += chunk;
            });

            response.on('end', () => {
                resolve(body);
            });

            response.on('error', err => {
                reject(err);
            });
        });

        post_req.write(data);
        post_req.end();
    });
}

```

###  1.前端开发日报接口
>前端开发日报列表、单日日报、前端框架top100

#### 1.1  最新前10天日报列表

**必选参数:**
无

**接口地址:**
`api/daily_list`

**调用例子:**
`http://localhost:3001/api/daily_list`


__接口返回数据__
```javascript
{
    "code": 200,
    "data": [
        {
            "title": "20171206 前端开发日报",
            "id": 20171206,
            "description": "基于 Vue-cli 的 webpack 通用封装, 更易简单的开始你的项目；Webapck+Vue多页面商城模板；前端每周清单第 42 期：V8 的执行流与优化， Pinterest 的 PWA 实践， Rust 与 WebAssembl ...",
            "date": "2017-12-06"
        },
        {
            "title": "20171127 前端开发日报",
            "id": 20171127,
            "description": "一次 H5 「保存页面为图片」 的踩坑之旅；纯 CSS 实现波浪效果；前端本地文件操作与上传；函数声明、函数表达式、匿名函数、立即执行函数详解；Chromium 新的弹窗机制以及 HTML 的 dialog 元素；RxJS 5 中文文档；C ...",
            "date": "2017-11-27"
        }
    ],
    "msg": ""
}
```

#### 1.2 单日日报内容

**必选参数:**
 日期    `id`

**接口地址:**
`api/daily_info/:id`

**调用例子:**
`http://localhost:3001/api/daily_info/20171206`

__接口返回数据__

```javascript
{
    "code": 200,
    "data": {
        "title": "20171206 前端开发日报",
        "description": "基于 Vue-cli 的 webpack 通用封装, 更易简单的开始你的项目；Webapck+Vue多页面商城模板；前端每周清单第 42 期：V8 的执行流与优化， Pinterest 的 PWA 实践， Rust 与 WebAssembly 应用；如何利用Git中的tag管理项目版本号；vue-loader 源码解析系列之 selector；[javascript]搞清this的指向只需问两个问题；分享一个比较全的webpack配置，分为基础和适配antdesign的配置；使用JavaScript 写web路由",
        "links": [
            {
                "title": "基于 vue-cli 的 webpack 通用封装, 更易简单的开始你的项目",
                "description": "基于 vue-cli 的 webpack 通用封装, 更易简单的开始你的项目 vayne 薇恩 基于 vue-cli 的 webpack 通用封装, 更易简单的开始你的项目 使用 npm i vayne -g yarn add vayne -D --registry",
                "url": "https://juejin.im/entry/5a20e7056fb9a045284647ce"
            },
            {
                "title": "简单案例学习Vue.js单元测试",
                "description": "简单案例学习Vue.js单元测试 使用 vue-cli 可以直接生成一个包含 unit & e2e 测试的开发环境。这里我们主要针对 unit 文件进行 单元测试 。 （本发首发于我的笔记网站） 命令行效果预览 test/unit 文件结构及分析 ├── coverage ├── jest.conf.js ├── setup.js └── specs ├── api-test.spec.js ├── click-test.spec.js ...",
                "url": "http://www.tuicool.com/articles/zYnE7vZ"
            },
            {
                "title": "Web开发这十年",
                "description": "Web开发这十年 作者 | Ivan Zarea 译者 | 薛命灯 Web 开发这十年都发生了怎样的变化？来看看 Ivan Zarea 总结的 Web 开发这十年。以下内容摘译自作者的博客，查看英文原文：",
                "url": "https://juejin.im/entry/5a2521f46fb9a0451463e11c"
            }
        ]
    },
    "msg": ""
}
```

#### 1.3 前端框架top 100
>返回前端top 100框架数据

**必选参数:**
 无  

**接口地址:**
`api/web_frame`

**调用例子:**
`http://localhost:3001/api/web_frame`

__接口返回数据__

```javascript
{
    "code": 200,
    "data": [
        {
            "index": "1",
            "thumb": "https://awesomes.oss-cn-beijing.aliyuncs.com/repo/151009222011-95-1.jpg?x-oss-process=style/subject_repo",
            "title": "bootstrap",
            "description": "目前最流行的 HTML, CSS 和 JavaScript 框架，用于开发响应式，移动端先行的 web 项目",
            "url": "https://github.com/twbs/bootstrap"
        },
        {
            "index": "2",
            "thumb": "https://awesomes.oss-cn-beijing.aliyuncs.com/repo/151011005628-65-1.jpg?x-oss-process=style/subject_repo",
            "title": "react",
            "description": "Facebook 推出的一款声明式的，高效的，灵活的用于创建用户接口的JavaScript 库",
            "url": "https://github.com/facebook/react"
        }
    ]
}

```

###  2.笑话段子搞笑图片
>笑话段子、搞笑图片

#### 2.1  段子列表
>段子列表、每页返回20条数据

**必选参数:**
'page' 页数

**接口地址:**
`/api/joke_list/:page`

**调用例子:**
`http://localhost:3001/api/joke_list/1`


__接口返回数据__
```javascript
{
    "code": 200,
    "data": [
        {
            "title": "做了个美梦，吓醒了。～～～～割～～～～；做梦刚开始好像是抱着老婆的咪咪喊别人的名字，后来想 ",
            "source": "糗事百科",
            "digest": "做了个美梦，吓醒了。～～～～割～～～～；做梦刚开始好像是抱着老婆的咪咪喊别人的名字，后来想想不对啊，应该抱着别人喊老婆才对，这样老婆就会高兴了，突然就惊醒了，我的老婆在哪呢。\u0001[流鼻血]\u0001[流鼻血]\u0001[流鼻血]"
        },
        {
            "title": "奶奶去世四十天了，生前最大的愿望就是想看到我女朋友，我的高中同学在那个医院做护士，是她帮了我这个忙，冒充了十分钟，她应该不玩段子的，还是衷心祝所有医院的天使一生平安！",
            "source": "内涵段子",
            "digest": "奶奶去世四十天了，生前最大的愿望就是想看到我女朋友，我的高中同学在那个医院做护士，是她帮了我这个忙，冒充了十分钟，她应该不玩段子的，还是衷心祝所有医院的天使一生平安！"
        }
    ],
    "msg": ""
}
```

#### 2.2  段子图片
>每天返回20条最新数据

**必选参数:**
'无' 

**接口地址:**
`/api/joke_img/`

**调用例子:**
`http://localhost:3001/api/joke_img`

__接口返回数据__

```javascript
{
    "code": 200,
    "data": [
        {
            "title": "泡妞最帅的姿势，hold啊",
            "thumburl": "http://ww3.sinaimg.cn/large/bd759d6djw1ezaly9mqf3j20c80exdgk.jpg",
            "sourceurl": "http://down.laifudao.com/images/tupian/20151210155356.jpg"
        },
      
        {
            "title": "麦当劳不如汉堡王的一个铁证！",
            "thumburl": "http://ww4.sinaimg.cn/large/94c4bcf2jw1dzwn3wx3tmj.jpg",
            "sourceurl": "http://down.laifudao.com/images/tupian/201212172720.jpg"
        },
        {
            "title": "幸福的拖拉机手",
            "thumburl": "http://ww1.sinaimg.cn/large/bcc86cc5jw1dzq54qxdd9j.jpg",
            "sourceurl": "http://down.laifudao.com/images/tupian/aa70448297.jpg"
        }
    ],
    "msg": ""
}
```

#### 2.3  搞笑图片
>每页返回10条最新数据

**必选参数:**
'无' 

**接口地址:**
`/api/joke_photo/:page`

**调用例子:**
`http://localhost:3001/api/joke_photo/1`

__接口返回数据__
```javascript
{
    "code": 200,
    "data": [
        {
            "title": "牛逼了我的公交哥",
            "img": "http://img.xiaoliaoba.cn/public/uploads/images/20171206/1512529717570948.png"
        },
        {
            "title": "好污的鼠标===",
            "img": "http://img.xiaoliaoba.cn/public/uploads/images/20171128/1511844635661496.png"
        },
        {
            "title": "撩妹，都是套路，防不胜防",
            "img": "http://img.xiaoliaoba.cn/public/uploads/images/20171128/1511844447422391.png"
        },
        {
            "title": "能不能专心点？",
            "img": "http://img.xiaoliaoba.cn/public/uploads/images/20171128/1511844362909028.png"
        },
        {
            "title": "宝贝，我老公不在家",
            "img": "http://img.xiaoliaoba.cn/public/uploads/images/20171124/1511508449453478.png"
        }
    ],
    "msg": ""
}
```

###  3. 新闻资讯
>新闻列表、新闻视频、新闻详情

#### 3.1  新闻列表
>新闻列表

**必选参数:**
`type` : 新闻类型 
 0 热点新闻 1 社会新闻 2 娱乐新闻 3体育新闻 4美文 5科技 6财经 7 时尚
  <table>
  <tr>
	<td>名称</td>
	<td>热点</td>
	<td>社会</td>
	<td>娱乐</td>
	<td>体育</td>
	<td>美文</td>
    <td>科技</td>
    <td>财经</td>
    <td>时尚</td>
</tr>
<tr>
	<td>type</td>
	<td>0</td>
	<td>1</td>
	<td>2</td>
	<td>3</td>
	<td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
</tr>

</table>


**接口地址:**
`/api/news_list/:type`

**调用例子:**
`http://localhost:3001/api/news_list/1`


__接口返回数据__

```javascript
{
    "media_name": "环球网",
    "ban_comment": 1,
    "abstract": "《吉林日报》今天用一个整版介绍了核武器常识及在遭到核攻击时的防护方法。这个版的内容传到互联网上后，迅速刷屏，引起纷纷议论。目前半岛局势紧张，朝鲜已进行了六次核试验，被广泛认为已经拥有了核弹头。另外朝鲜的导弹技术今年以来快速突破，成功试射了射程可覆盖美国本土的洲际弹道导弹。",
    "image_list": [],
    "datetime": "2017-12-06 21:13",
    "article_type": 1,
    "tag": "news_military",
    "has_m3u8_video": 0,
    "keywords": "半岛,朝鲜半岛,朝鲜,吉林,半岛局势",
    "display_dt": 1512539220,
    "has_mp4_video": 0,
    "aggr_type": 1,
    "cell_type": 0,
    "article_sub_type": 1,
    "bury_count": 2,
    "title": "社评：吉林日报介绍核武常识，意味着什么",
    "source_icon_style": 1,
    "tip": 1,
    "has_video": false,
    "share_url": "http://m.toutiao.com/group/6496307172245242381/?iid=0&app=news_article",
    "source": "环球网",
    "comment_count": 63,
    "article_url": "https://m.huanqiu.com/r/MV8wXzExNDI3MjE0XzI4Ml8xNTEyNTM5MjIw",
    "publish_time": 1512539220,
    "group_flags": 0,
    "action_extra": "{\"channel_id\": 3189398996}",
    "tag_id": "6496307172245242381",
    "source_url": "/item/6496307172245242381/",
    "display_url": "http://toutiao.com/group/6496307172245242381/",
    "is_stick": false,
    "item_id": "6496307172245242381",
    "repin_count": 2308,
    "cell_flag": 11,
    "source_open_url": "sslocal://profile?uid=5954781019",
    "level": 0,
    "digg_count": 1,
    "behot_time": 1512566010,
    "hot": 1,
    "cursor": 1512566010999,
    "url": "https://m.huanqiu.com/r/MV8wXzExNDI3MjE0XzI4Ml8xNTEyNTM5MjIw",
    "like_count": 1,
    "user_repin": 0,
    "has_image": false,
    "video_style": 0,
    "media_info": {
        "avatar_url": "http://p1.pstatp.com/large/4d00054b126ceaf920",
        "media_id": 5954781019,
        "name": "环球网",
        "user_verified": false
    },
    "group_id": "6496307172245242381"
}
```

#### 3.2  新闻详情
>每页返回10条最新数据

**必选参数:**

`item_id`    新闻列表的 item id

**接口地址:**
`/api/news_detail/:item_id`

**调用例子:**
`http://localhost:3001/api/news_detail/6496307172245242381`

__接口返回数据__

```javascript
{
    "detail_source": "环球网",
    "media_user": {
        "no_display_pgc_icon": false,
        "avatar_url": "http://p9.pstatp.com/thumb/4d00054b126ceaf920",
        "id": "5954781019",
        "screen_name": "环球网"
    },
    "publish_time": 1512568020,
    "title": "社评：吉林日报介绍核武常识，意味着什么",
    "url": "https://m.huanqiu.com/r/MV8wXzExNDI3MjE0XzI4Ml8xNTEyNTM5MjIw",
    "is_original": false,
    "is_pgc_article": false,
    "content": "<p>《吉林日报》今天用一个整版介绍了核武器常识及在遭到核攻击时的防护方法。这个版的内容传到互联网上后，迅速刷屏，引起纷纷议论。</p>",
    "source": "环球网",
    "comment_count": 63,
    "creator_uid": 5954781019
}
```


#### 3.3   视频数据
**必选参数:**
`type` : 类型 <br /> 0搞笑视频  1美女视频  2体育视频  3 新闻现场 4涨姿势  5猎奇  6 黑科技 默认搞笑视频
<br />
 `page` : 分页 如:0/10/20/30
  <table>
<tr>
	<td>type</td>
	<td>0</td>
	<td>1</td>
	<td>2</td>
	<td>3</td>
	<td>4</td>
    <td>5</td>
    <td>6</td>
</tr>
<tr>
	<td>名称</td>
    <td>搞笑</td>
	<td>美女</td>
	<td>体育</td>
	<td>新闻现场</td>
	<td>涨姿势</td>
	<td>猎奇</td>
    <td>黑科技</td>
</tr>
</table>



**接口地址:**
`api/video_list/:type/:page`

**调用例子:**
`http://localhost:3001/api/video_list/1/0`

返回数据(由于长度就展示2条看)如下JSON:
```javascript

```

###  4.kugou音乐wap端接口数据
>音乐新歌榜单、音乐歌单、排行榜、音乐详情、歌词、搜索、歌手信息、
>详细可看源代码 `api/music`

#### 1.1  音乐新歌榜单

**必选参数:**
无

**接口地址:**
`api/new_songs`

**调用例子:**
`http://localhost:3001/api/new_songs`


__接口返回数据__


###  5 job工作搜索
>获取某个城市的某个工作岗位

#### 5.1  工作搜索

**必选参数:**

`city` : 城市  
`positionName` 职位  
`pageNo` 页码  

**接口地址:**
`api/job_list/:city/:positionName/:pageNo`

**调用例子:**
`http://localhost:3001/api/job_list/深圳/前端开发/1`


__接口返回数据__