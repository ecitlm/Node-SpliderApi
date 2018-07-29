# SplderApi2

**Node-SplderApi2 数据爬虫**

> 基于 Node+Express 网络爬虫 API 接口 包括前端开发日报、kugou 音乐、前端 top 框架排行、妹纸福利、搞笑视频、段子笑话、各类视频新闻资讯 热点详情接口数据,接口数据更新目标数据变化而变化，接口可以用于框架学习前端对接练习使用.

**源代码目录结构**
**[地址](https://github.com/ecitlm/Node-SpliderApi/tree/splider2)**

<a href="https://ecitlm.github.io/SpliderApi/#/">查看文档</a>

![project.png](https://i.loli.net/2017/12/07/5a28ea5c3468d.png)

### 环境要求

> 需要安装 node express

### 部署运行

```javascript
$ git clone https://github.com/ecitlm/Node-SpliderApi.git
$ npm install
### 运行
$ node app.js
```

服务器启动默认端口为 3001 、启动之后就可以开启了接口服务了.

浏览器打开`http://localhost:3001/docs` 可以查看所有接口文档

**接口文件**

```txt
├─api
│  ├─it
│  │      daily_info.js
│  │      daily_list.js
│  │      web_frame.js
│  │
│  ├─job
│  │      job_info.js
│  │      job_list.js
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
│          jandan.js
│          photo_list.js
│          photo_type.js
│          photo_view.js
│
└─web
        daily_info.js
        daily_list.js
        index.js
        jandan.js
        photo.js
```

**`网络请求封装`httpServer.js`**

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
  let options = {
    host: host,
    port: 80,
    path: path + querystring.stringify(data),
    method: 'GET',
    encoding: null,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
    }
  }
  //判断是否为https请求
  if (status) {
    http = require('https')
    options.port = 443
  }

  return new Promise(function(resolve, reject) {
    let body = ''
    let get_req = http.request(options, function(response) {
      //response.setEncoding('utf8');
      response.on('data', function(chunk) {
        body += chunk
      })

      response.on('end', () => {
        resolve(body)
      })

      response.on('error', err => {
        reject(err)
      })
    })
    get_req.end()
  })
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
  let data = querystring.stringify(data)
  let options = {
    host: host,
    port: '80',
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36',
      'Content-Length': Buffer.byteLength(data) //返回字符串实际占据的字节长度
    }
  }
  //判断是否为https请求
  if (status) {
    http = require('https')
    options.port = 443
  }
  return new Promise(function(resolve, reject) {
    let body = ''
    let post_req = http.request(options, function(response) {
      //console.log(response.statusCode);
      response.on('data', function(chunk) {
        body += chunk
      })

      response.on('end', () => {
        resolve(body)
      })

      response.on('error', err => {
        reject(err)
      })
    })

    post_req.write(data)
    post_req.end()
  })
}
```

### 1.前端开发日报接口

> 前端开发日报列表、单日日报、前端框架 top100

#### 1.1 最新前 10 天日报列表

**必选参数:**
无

**接口地址:**
`api/daily_list`

**调用例子:**
`http://localhost:3001/api/daily_list`

**接口返回数据**

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
日期 `id`

**接口地址:**
`api/daily_info/:id`

**调用例子:**
`http://localhost:3001/api/daily_info/20171206`

**接口返回数据**

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

#### 1.3 前端框架 top 100

> 返回前端 top 100 框架数据

**必选参数:**
无

**接口地址:**
`api/web_frame`

**调用例子:**
`http://localhost:3001/api/web_frame`

**接口返回数据**

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

### 2.笑话段子搞笑图片

> 笑话段子、搞笑图片

#### 2.1 段子列表

> 段子列表、每页返回 20 条数据

**必选参数:**
'page' 页数

**接口地址:**
`/api/joke_list/:page`

**调用例子:**
`http://localhost:3001/api/joke_list/1`

**接口返回数据**

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

#### 2.2 段子图片

> 每天返回 20 条最新数据

**必选参数:**
'无'

**接口地址:**
`/api/joke_img/`

**调用例子:**
`http://localhost:3001/api/joke_img`

**接口返回数据**

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

#### 2.3 搞笑图片

> 每页返回 10 条最新数据

**必选参数:**
'无'

**接口地址:**
`/api/joke_photo/:page`

**调用例子:**
`http://localhost:3001/api/joke_photo/1`

**接口返回数据**

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

### 3. 新闻资讯

> 新闻列表、新闻视频、新闻详情

#### 3.1 新闻列表

> 新闻列表

**必选参数:**
`type` : 新闻类型
0 热点新闻 1 社会新闻 2 娱乐新闻 3 体育新闻 4 美文 5 科技 6 财经 7 时尚

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

**接口返回数据**

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

#### 3.2 新闻详情

> 每页返回 10 条最新数据

**必选参数:**

`item_id` 新闻列表的 item id

**接口地址:**
`/api/news_detail/:item_id`

**调用例子:**
`http://localhost:3001/api/news_detail/6496307172245242381`

**接口返回数据**

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

#### 3.3 视频数据

**必选参数:**
`type` : 类型 <br /> 0 搞笑视频 1 美女视频 2 体育视频 3 新闻现场 4 涨姿势 5 猎奇 6 黑科技 默认搞笑视频
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

返回数据(由于长度就展示 2 条看)如下 JSON:

```javascript
```

### 4.kugou 音乐 wap 端接口数据

> 音乐新歌榜单、音乐歌单、排行榜、音乐详情、歌词、搜索、歌手信息、详细可看源代码 `api/music`

#### 4.1 音乐新歌榜单

**必选参数:**
无

**接口地址:**
`api/new_songs`

**调用例子:**
`http://localhost:3001/api/new_songs`

**接口返回数据**

#### 4.2 音乐歌单

**必选参数:**
'无'

**接口地址:**
`api/plist/`

**调用例子:**
`http://localhost:3001/api/plist/`

**接口返回数据**

```javascript
{
    "code": 200,
    "data": {
        "list": {
            "timestamp": 1513235759,
            "info": [
                {
                    "recommendfirst": 1,
                    "specialname": "2017 Billboard公告牌单曲年终榜",
                    "intro": "2017年Billboard Hot100公告牌单曲年终榜终于揭晓！形状Shape of You夺冠，力压西语Despacito！火星哥Bruno Mars、喇嘛Kendrick Lamar、烟鬼The Chainsmokers、王者Migos分别获得第3至6，去年冠单Closer居然爆冷延续成绩今年夺第7，披萨哥Sam Hunt成为拯救乡村获第8，梦龙Imagine Dragons成功回春第9，沙县哥Post Malone人气高涨跑第10，完整100首为你送上！",
                    "songs": [
                        {
                            "pay_type_320": 0,
                            "m4afilesize": 0,
                            "price_sq": 0,
                            "filesize": 3261752,
                            "bitrate": 128,
                            "price": 0,
                            "inlist": 1,
                            "old_cpy": 1,
                            "pkg_price_sq": 0,
                            "pay_type": 0,
                            "topic_url": "",
                            "rp_type": "audio",
                            "pkg_price": 0,
                            "feetype": 0,
                            "filename": "Imagine Dragons - Believer",
                            "price_320": 0,
                            "topic_url_320": "",
                            "hash": "AE807FE1E770339DFB442CCC9089ED83",
                            "mvhash": "2D5001E399F9311134049BBF4FB8BBD7",
                            "privilege": 0,
                            "album_id": "2983162",
                            "sqhash": "EC771C3EB4293E80C4AD78D2850A918E",
                            "album_audio_id": 68368922,
                            "pkg_price_320": 0,
                            "320filesize": 8390523,
                            "rp_publish": 1,
                            "duration": 204,
                            "topic_url_sq": "",
                            "fail_process_320": 0,
                            "remark": "《东方快车谋杀案》电影预告插曲",
                            "extname": "mp3",
                            "320privilege": 0,
                            "fail_process": 0,
                            "fail_process_sq": 0,
                            "has_accompany": 0,
                            "pay_type_sq": 0,
                            "audio_id": 25013553,
                            "sqprivilege": 0,
                            "sqfilesize": 25490657,
                            "320hash": "6365B9383F70DD1CCCE73D12A15A3BCB"
                        },

                        {
                            "pay_type_320": 0,
                            "m4afilesize": 0,
                            "price_sq": 0,
                            "filesize": 4086002,
                            "bitrate": 128,
                            "price": 0,
                            "inlist": 1,
                            "old_cpy": 1,
                            "pkg_price_sq": 0,
                            "pay_type": 0,
                            "topic_url": "",
                            "rp_type": "audio",
                            "pkg_price": 0,
                            "feetype": 0,
                            "filename": "邱永传 - 十一年",
                            "price_320": 0,
                            "topic_url_320": "",
                            "hash": "0EF197D2106F57E2B508387D5B3C6B77",
                            "mvhash": "2A32DB55478F8FDE8061BE56CFEAE85E",
                            "privilege": 0,
                            "album_id": "580990",
                            "sqhash": "",
                            "album_audio_id": 61990788,
                            "pkg_price_320": 0,
                            "320filesize": 10197266,
                            "rp_publish": 1,
                            "duration": 255,
                            "topic_url_sq": "",
                            "fail_process_320": 0,
                            "remark": "一年之前董鸿",
                            "extname": "mp3",
                            "320privilege": 0,
                            "fail_process": 0,
                            "fail_process_sq": 0,
                            "has_accompany": 1,
                            "pay_type_sq": 0,
                            "audio_id": 255090,
                            "sqprivilege": 0,
                            "sqfilesize": 0,
                            "320hash": "DA73E72E07D89E9F5CE98606B7EE9B4C"
                        },
                        {
                            "pay_type_320": 0,
                            "m4afilesize": 0,
                            "price_sq": 0,
                            "filesize": 3786506,
                            "bitrate": 128,
                            "price": 0,
                            "inlist": 1,
                            "old_cpy": 1,
                            "pkg_price_sq": 0,
                            "pay_type": 0,
                            "topic_url": "",
                            "rp_type": "audio",
                            "pkg_price": 0,
                            "feetype": 0,
                            "filename": "张艾文 - 下辈子也要找到你",
                            "price_320": 0,
                            "topic_url_320": "",
                            "hash": "C7040924FAA9C9E6A5AD8ACBD3138B04",
                            "mvhash": "852CDC6A51E4542BA085DDF0A95F1CE7",
                            "privilege": 0,
                            "album_id": "2441508",
                            "sqhash": "",
                            "album_audio_id": 62581153,
                            "pkg_price_320": 0,
                            "320filesize": 9569304,
                            "rp_publish": 1,
                            "duration": 237,
                            "topic_url_sq": "",
                            "fail_process_320": 0,
                            "remark": "把你的名字写在烟上吸进肺里正源",
                            "extname": "mp3",
                            "320privilege": 0,
                            "fail_process": 0,
                            "fail_process_sq": 0,
                            "has_accompany": 1,
                            "pay_type_sq": 0,
                            "audio_id": 1147,
                            "sqprivilege": 0,
                            "sqfilesize": 0,
                            "320hash": "76005E6C907D78DCB105FC1579A1D81A"
                        }
                    ],
                    "collectcount": 160050,
                    "is_selected": 0,
                    "selected_reason": "",
                    "slid": 27,
                    "publishtime": "2016-08-23 00:00:00",
                    "singername": "",
                    "verified": 0,
                    "songcount": 16,
                    "user_avatar": "http://imge.kugou.com/kugouicon/165/20161103/20161103180849350.jpg",
                    "playcount": 143379453,
                    "suid": 509004185,
                    "specialid": 117915,
                    "username": "天逸",
                    "imgurl": "http://imge.kugou.com/soft/collection/{size}/20161024/20161024164346240074.jpg",
                    "user_type": 0
                }
            ],
            "total": 18044
        },
        "pagesize": 30
    },
    "msg": ""
}
```

#### 4.3 音乐歌单下的音乐列表

**必选参数:**
'specialid' 歌单 specialid

**接口地址:**
`api/plist_songs/:specialid`

**调用例子:**
`http://localhost:3001/api/plist_songs/125032`

**接口返回数据**

```javascript
{
    "code": 200,
    "data": {
        "list": {
            "timestamp": 1513239718,
            "info": [

                {
                    "pay_type_320": 0,
                    "m4afilesize": 0,
                    "price_sq": 0,
                    "filesize": 3515386,
                    "bitrate": 128,
                    "price": 0,
                    "inlist": 1,
                    "old_cpy": 1,
                    "pkg_price_sq": 0,
                    "pay_type": 0,
                    "topic_url": "",
                    "fail_process_320": 0,
                    "pkg_price": 0,
                    "feetype": 0,
                    "filename": "张清芳 - 大雨的夜里",
                    "price_320": 0,
                    "extname": "mp3",
                    "hash": "63243D4D3DAC30CF17838C385E1844B8",
                    "mvhash": "0405F2379C0BB8B6BDDD58D8A7B929E6",
                    "privilege": 0,
                    "album_id": "575484",
                    "album_audio_id": 28366279,
                    "rp_type": "audio",
                    "audio_id": 63023,
                    "320filesize": 8611131,
                    "rp_publish": 1,
                    "duration": 219,
                    "topic_url_sq": "",
                    "pkg_price_320": 0,
                    "remark": "大雨的夜里",
                    "sqhash": "CA1C02011D022B2BC66C6D5E8FDD7DBA",
                    "320privilege": 0,
                    "fail_process": 0,
                    "fail_process_sq": 0,
                    "has_accompany": 1,
                    "pay_type_sq": 0,
                    "320hash": "FBBFDD7EB279668A319ECAEB6E4101AF",
                    "sqprivilege": 0,
                    "topic_url_320": "",
                    "sqfilesize": 26690522
                },
                {
                    "pay_type_320": 0,
                    "m4afilesize": 0,
                    "price_sq": 0,
                    "filesize": 5102653,
                    "bitrate": 128,
                    "price": 0,
                    "inlist": 1,
                    "old_cpy": 1,
                    "pkg_price_sq": 0,
                    "pay_type": 0,
                    "topic_url": "",
                    "fail_process_320": 0,
                    "pkg_price": 0,
                    "feetype": 0,
                    "filename": "王杰 - 说声珍重",
                    "price_320": 0,
                    "extname": "mp3",
                    "hash": "82BB0AF731137BCC90BC434A9BA8D2FE",
                    "mvhash": "E8B543DD9504DE25EA41E87A3682085F",
                    "privilege": 0,
                    "album_id": "1737853",
                    "album_audio_id": 39562913,
                    "rp_type": "audio",
                    "audio_id": 32286,
                    "320filesize": 12781380,
                    "rp_publish": 1,
                    "duration": 318,
                    "topic_url_sq": "",
                    "pkg_price_320": 0,
                    "remark": "浪子情歌",
                    "sqhash": "1B4AD517F10D38F0716F5A48298B2CEB",
                    "320privilege": 0,
                    "fail_process": 0,
                    "fail_process_sq": 0,
                    "has_accompany": 1,
                    "pay_type_sq": 0,
                    "320hash": "670FBEEF9A0B35832BBED65765F4EE57",
                    "sqprivilege": 0,
                    "topic_url_320": "",
                    "sqfilesize": 31542218
                }
            ],
            "total": 5
        },
        "pagesize": 30,
        "page": 1
    },
    "msg": ""
}
```

#### 4.4 音乐排行榜

**必选参数:**
'无'

**接口地址:**
`api/rank_list/`

**调用例子:**
`http://localhost:3001/api/rank_list/`

**接口返回数据**

```javascript
{
    "code": 200,
    "data": {
        "total": 27,
        "list": [
            {
                "rankid": 6666,
                "id": 1,
                "update_frequency": "每天",
                "intro": "数据来源：酷狗\r\n排序方式：按歌曲搜索播放量的涨幅排序\r\n更新周期：每天",
                "jump_url": "",
                "jump_title": "",
                "imgurl": "http://imge.kugou.com/mcommon/{size}/20150717/20150717100030907982.png",
                "banner7url": "http://imge.kugou.com/mcommon/{size}/20150331/20150331161100773965.png",
                "isvol": 1,
                "bannerurl": "http://imge.kugou.com/mcommonbanner/{size}/20150331/20150331161102692497.jpg",
                "custom_type": 0,
                "rankname": "酷狗飙升榜",
                "ranktype": 2
            },

            {
                "rankid": 24574,
                "id": 123,
                "update_frequency": "周三",
                "intro": "数据来源：酷狗神曲及搞怪类歌曲\r\n排序方式：按搜索播放一周总量排序\r\n更新周期：周三",
                "jump_url": "",
                "jump_title": "",
                "imgurl": "http://imge.kugou.com/mcommon/{size}/20160713/20160713115034579027.jpg",
                "banner7url": "http://imge.kugou.com/mcommon/{size}/20160713/20160713115035225905.jpg",
                "isvol": 0,
                "bannerurl": "http://imge.kugou.com/mcommonbanner/{size}/20160713/20160713115036492119.jpg",
                "custom_type": 0,
                "rankname": "洗脑神曲",
                "ranktype": 0
            }
        ]
    },
    "msg": ""
}
```

#### 4.5 排行版分类歌曲列表

**必选参数:**
'rankid' rankid

**接口地址:**
`api/rank_list_info/:rankid`

**调用例子:**
`http://localhost:3001/api/rank_list_info/8888`

**接口返回数据**

```javascript
{
    "code": 200,
    "data": {
        "info": {
            "rankid": 8888,
            "id": 2,
            "update_frequency": "周四",
            "intro": "数据来源：酷狗\r\n排序方式：按歌曲搜索播放一周总量排序\r\n更新周期：周四",
            "jump_url": "",
            "jump_title": "",
            "imgurl": "http://imge.kugou.com/mcommon/{size}/20150717/20150717100046499341.png",
            "banner7url": "http://imge.kugou.com/mcommon/{size}/20150331/20150331161158855874.png",
            "isvol": 1,
            "bannerurl": "http://imge.kugou.com/mcommonbanner/{size}/20150331/20150331161200306618.jpg",
            "custom_type": 0,
            "rankname": "酷狗TOP500",
            "ranktype": 2
        },
        "songs": {
            "total": 182,
            "page": 1,
            "pagesize": 30,
            "timestamp": 1513239512,
            "list": [
                {
                    "pay_type_320": 0,
                    "m4afilesize": 0,
                    "price_sq": 0,
                    "first": 0,
                    "filesize": 4334854,
                    "bitrate": 128,
                    "price": 0,
                    "inlist": 1,
                    "old_cpy": 1,
                    "pkg_price_sq": 0,
                    "pay_type": 0,
                    "topic_url": "",
                    "rp_type": "audio",
                    "pkg_price": 0,
                    "recommend_reason": "",
                    "filename": "大壮 - 我们不一样",
                    "price_320": 0,
                    "extname": "mp3",
                    "hash": "1035269C05791F1665E36DFFE478326C",
                    "audio_id": 26902195,
                    "privilege": 0,
                    "topic_url_320": "",
                    "addtime": "2017-12-14 09:00:02",
                    "pkg_price_320": 0,
                    "sqfilesize": 30589685,
                    "fail_process_320": 0,
                    "duration": 271,
                    "feetype": 0,
                    "320filesize": 10836758,
                    "rp_publish": 1,
                    "has_accompany": 1,
                    "topic_url_sq": "",
                    "remark": "我们不一样",
                    "isfirst": 0,
                    "sqhash": "E07225E4F5E60E6FA03F92025A54E2B2",
                    "320privilege": 0,
                    "320hash": "383CBD0CC555F7EC0E30BCC2E93042F2",
                    "fail_process": 0,
                    "album_id": "2699062",
                    "pay_type_sq": 0,
                    "mvhash": "F37AB57EC2D9823DB5C11CBBC6ED83D6",
                    "sqprivilege": 0,
                    "album_audio_id": 65887695,
                    "fail_process_sq": 0
                },

                {
                    "pay_type_320": 0,
                    "m4afilesize": 0,
                    "price_sq": 0,
                    "first": 0,
                    "filesize": 3613875,
                    "bitrate": 128,
                    "price": 0,
                    "inlist": 1,
                    "old_cpy": 1,
                    "pkg_price_sq": 0,
                    "pay_type": 0,
                    "topic_url": "",
                    "rp_type": "audio",
                    "pkg_price": 0,
                    "recommend_reason": "",
                    "filename": "校长 - 带你去旅行",
                    "price_320": 0,
                    "extname": "mp3",
                    "hash": "F851405DBBE1DB329AF8E42B580DD7DC",
                    "audio_id": 27716543,
                    "privilege": 0,
                    "topic_url_320": "",
                    "addtime": "2017-12-14 09:00:04",
                    "pkg_price_320": 0,
                    "sqfilesize": 24425537,
                    "fail_process_320": 0,
                    "duration": 226,
                    "feetype": 0,
                    "320filesize": 9034387,
                    "rp_publish": 1,
                    "has_accompany": 1,
                    "topic_url_sq": "",
                    "remark": "带你去旅行",
                    "isfirst": 0,
                    "sqhash": "D166D042AC11EC0B9346D2FED72A8DBA",
                    "320privilege": 0,
                    "320hash": "C816B4527D955551FBD680DE02C7C694",
                    "fail_process": 0,
                    "album_id": "2998345",
                    "pay_type_sq": 0,
                    "mvhash": "C8714BF1FB79158FAB7252B73E8DC2DB",
                    "sqprivilege": 0,
                    "album_audio_id": 68441445,
                    "fail_process_sq": 0
                },
                {
                    "pay_type_320": 0,
                    "m4afilesize": 0,
                    "price_sq": 0,
                    "first": 0,
                    "filesize": 3774555,
                    "bitrate": 127,
                    "price": 0,
                    "inlist": 1,
                    "old_cpy": 1,
                    "pkg_price_sq": 0,
                    "pay_type": 0,
                    "topic_url": "",
                    "rp_type": "audio",
                    "pkg_price": 0,
                    "recommend_reason": "",
                    "filename": "金志文、徐佳莹 - 远走高飞",
                    "price_320": 0,
                    "extname": "mp3",
                    "hash": "ADE9E0BBFF0AD6E11FEE1D0C5D95D2E1",
                    "audio_id": 26441731,
                    "privilege": 0,
                    "topic_url_320": "",
                    "addtime": "2017-12-14 09:00:04",
                    "pkg_price_320": 0,
                    "sqfilesize": 28366405,
                    "fail_process_320": 0,
                    "duration": 235,
                    "feetype": 0,
                    "320filesize": 9437760,
                    "rp_publish": 1,
                    "has_accompany": 1,
                    "topic_url_sq": "",
                    "remark": "Hello 1",
                    "isfirst": 0,
                    "sqhash": "421B428535E37D6853E2BA3DED469198",
                    "320privilege": 0,
                    "320hash": "F8265A79F1EB53DB8090EFFCC124865E",
                    "fail_process": 0,
                    "album_id": "2139938",
                    "pay_type_sq": 0,
                    "mvhash": "",
                    "sqprivilege": 0,
                    "album_audio_id": 57559532,
                    "fail_process_sq": 0
                },

                {
                    "pay_type_320": 0,
                    "m4afilesize": 0,
                    "price_sq": 0,
                    "first": 0,
                    "filesize": 3774215,
                    "bitrate": 128,
                    "price": 0,
                    "inlist": 1,
                    "old_cpy": 1,
                    "pkg_price_sq": 0,
                    "pay_type": 0,
                    "topic_url": "",
                    "rp_type": "audio",
                    "pkg_price": 0,
                    "recommend_reason": "",
                    "filename": "岑宁儿 - 追光者",
                    "price_320": 0,
                    "extname": "mp3",
                    "hash": "332D8257716EFD86D075809E61CFD5D5",
                    "audio_id": 26952339,
                    "privilege": 0,
                    "topic_url_320": "",
                    "addtime": "2017-12-14 09:00:06",
                    "pkg_price_320": 0,
                    "sqfilesize": 21884066,
                    "fail_process_320": 0,
                    "duration": 235,
                    "feetype": 0,
                    "320filesize": 9435472,
                    "rp_publish": 1,
                    "has_accompany": 1,
                    "topic_url_sq": "",
                    "remark": "《夏至未至》电视剧插曲",
                    "isfirst": 0,
                    "sqhash": "355D873021FAFC1CD8056FB51EF73DBF",
                    "320privilege": 0,
                    "320hash": "D3B95C20B11A808DAF17E7A8EBD67FF1",
                    "fail_process": 0,
                    "album_id": "2704683",
                    "pay_type_sq": 0,
                    "mvhash": "9AE275177F50D6BAFEB10649C7DB911D",
                    "sqprivilege": 0,
                    "album_audio_id": 65986345,
                    "fail_process_sq": 0
                },

                {
                    "pay_type_320": 0,
                    "m4afilesize": 0,
                    "price_sq": 0,
                    "first": 0,
                    "filesize": 4321056,
                    "bitrate": 128,
                    "price": 0,
                    "inlist": 1,
                    "old_cpy": 1,
                    "pkg_price_sq": 0,
                    "pay_type": 0,
                    "topic_url": "",
                    "rp_type": "audio",
                    "pkg_price": 0,
                    "recommend_reason": "",
                    "filename": "阿涵 - 过客",
                    "price_320": 0,
                    "extname": "mp3",
                    "hash": "69EF01B327A5C8A8788CC8FF1B5B6CB6",
                    "audio_id": 24349570,
                    "privilege": 0,
                    "topic_url_320": "",
                    "addtime": "2017-12-14 09:00:22",
                    "pkg_price_320": 0,
                    "sqfilesize": 28560075,
                    "fail_process_320": 0,
                    "duration": 270,
                    "feetype": 0,
                    "320filesize": 10802349,
                    "rp_publish": 1,
                    "has_accompany": 1,
                    "topic_url_sq": "",
                    "remark": "过客",
                    "isfirst": 0,
                    "sqhash": "96742196CF62B569A237683EE5F183C2",
                    "320privilege": 0,
                    "320hash": "DA16770BE62BEE4F67627C64EC4374BA",
                    "fail_process": 0,
                    "album_id": "2584684",
                    "pay_type_sq": 0,
                    "mvhash": "672E85FFBC12278B3328563AFFFA95DD",
                    "sqprivilege": 0,
                    "album_audio_id": 64166856,
                    "fail_process_sq": 0
                }
            ]
        },
        "pagesize": 30
    },
    "msg": ""
}
```

#### 4.5 歌手分类

**必选参数:**
'无'

**接口地址:**
`api/singer_classify/`

**调用例子:**
`http://localhost:3001/api/singer_classify`

**接口返回数据**

```javascript
{
    "code": 200,
    "data": [
        {
            "classid": 88,
            "classname": "热门歌手",
            "imgurl": "http://mobileimg.kugou.com/billImage/150/26-11.jpg"
        },
        {
            "classid": 1,
            "classname": "华语男歌手",
            "imgurl": "http://mobileimg.kugou.com/billImage/150/26-1.jpg"
        },
        {
            "classid": 2,
            "classname": "华语女歌手",
            "imgurl": "http://mobileimg.kugou.com/billImage/150/26-2.jpg"
        },
        {
            "classid": 3,
            "classname": "华语组合",
            "imgurl": "http://mobileimg.kugou.com/billImage/150/26-3.jpg"
        },
        {
            "classid": 4,
            "classname": "日韩男歌手",
            "imgurl": "http://mobileimg.kugou.com/billImage/150/26-4.jpg"
        },
        {
            "classid": 5,
            "classname": "日韩女歌手",
            "imgurl": "http://mobileimg.kugou.com/billImage/150/26-5.jpg"
        },
        {
            "classid": 6,
            "classname": "日韩组合",
            "imgurl": "http://mobileimg.kugou.com/billImage/150/26-6.jpg"
        },
        {
            "classid": 7,
            "classname": "欧美男歌手",
            "imgurl": "http://mobileimg.kugou.com/billImage/150/26-7.jpg"
        },
        {
            "classid": 8,
            "classname": "欧美女歌手",
            "imgurl": "http://mobileimg.kugou.com/billImage/150/26-8.jpg"
        },
        {
            "classid": 9,
            "classname": "欧美组合",
            "imgurl": "http://mobileimg.kugou.com/billImage/150/26-9.jpg"
        }
    ],
    "msg": ""
}
```

#### 4.6 歌手分类下面的歌手列表

**必选参数:**
'classid' classid

**接口地址:**
`api/singer_list/:classid`

**调用例子:**
`http://localhost:3001/api/singer_list/88`

**接口返回数据**

#### 4.7 歌手信息

**必选参数:**
'singerid ' singerid 3060

**接口地址:**
`api/singer_info/:singerid`

**调用例子:**
`http://localhost:3001/api/singer_info/3060`

**接口返回数据**

```

```

#### 4.8 歌曲音乐详情

**必选参数:**
'hash' hash CB7EE97F4CC11C4EA7A1FA4B516A5D97

**接口地址:**
`api/song_info/:hash`

**调用例子:**
`http://localhost:3001/api/song_info/CB7EE97F4CC11C4EA7A1FA4B516A5D97`

**接口返回数据**

```javascript
{
    "code": 200,
    "data": {
        "fileHead": 100,
        "q": 0,
        "extra": {
            "320filesize": 7998693,
            "sqfilesize": 23222557,
            "sqhash": "CAC59E48D58853BF40BB6158F2F5B0C5",
            "128hash": "CB7EE97F4CC11C4EA7A1FA4B516A5D97",
            "320hash": "47F63F15A7C048829FA796BC7F74E62B",
            "128filesize": 3198974
        },
        "fileSize": 3198974,
        "hash": "CB7EE97F4CC11C4EA7A1FA4B516A5D97",
        "choricSinger": "李玉刚",
        "error": "",
        "topic_remark": "",
        "imgUrl": "http://singerimg.kugou.com/uploadpic/softhead/{size}/20140304/20140304154338526832.jpg",
        "url": "http://fs.open.kugou.com/f2ad1903c8c98c2aac2f9b1c85b66a86/5a336c48/G078/M08/18/17/jg0DAFgi6G-AKqsqADDP_nSW5F4051.mp3",
        "time": 1513321293,
        "bitRate": 128,
        "songName": "刚好遇见你",
        "req_hash": "CB7EE97F4CC11C4EA7A1FA4B516A5D97",
        "singerHead": "",
        "album_img": "http://imge.kugou.com/stdmusic/{size}/20161109/20161109171040932108.jpg",
        "privilege": 0,
        "status": 1,
        "stype": 11323,
        "singerId": 2018,
        "singerName": "李玉刚",
        "ctype": 1009,
        "fileName": "李玉刚 - 刚好遇见你",
        "topic_url": "",
        "intro": "",
        "mvhash": "C4AFAEFC84A7D1B6B413288377203B38",
        "extName": "mp3",
        "errcode": 0,
        "timeLength": 200
    },
    "msg": ""
}
```

#### 4.9 歌曲音乐歌词

**必选参数:**
'hash' hash CB7EE97F4CC11C4EA7A1FA4B516A5D97

**接口地址:**
`api/song_lrc/:hash`

**调用例子:**
`http://localhost:3001/api/song_lrc/CB7EE97F4CC11C4EA7A1FA4B516A5D97`

#### 4.10 歌曲音乐搜索

**必选参数:**
'keyword' keyword

**接口地址:**
`api/music_search/:keyword`

**调用例子:**
`http://localhost:3001/api/music_search/谭咏麟`

### 5 job 工作搜索

> 获取某个城市的某个工作岗位

#### 5.1 工作搜索

**必选参数:**

`city` : 城市  
`positionName` 职位  
`pageNo` 页码

**接口地址:**
`api/job_list/:city/:positionName/:pageNo`

**调用例子:**
`http://localhost:3001/api/job_list/深圳/前端开发/1`

**接口返回数据**

#### 5.2 职位详情

**必选参数:**

`positionId` : 职位 id

**接口地址:**
`api/job_info/:positionId`

**调用例子:**
`http://localhost:3001/api/job_info/3844372`

**接口返回数据**

```javascript
{
    "code": 200,
    "data": {
        "title": "前端开发工程师招聘-7贷金融招聘-拉勾网",
        "publishtime": "1天前  发布于拉勾网",
        "job": "前端开发工程师",
        "salary": "15k-25k",
        "workyear": "经验1-3年 /",
        "education": "本科及以上 /",
        "workaddress": "深圳",
        "positionAddress": "蛇口望海路招商局广场17楼",
        "temptation": "\n        职位诱惑：\n        环境优美,福利多,交通便利\n    ",
        "content": "\n        <h3 class=\"description\">职位描述：</h3>\n        <div>\n        <p>1.负责页面相关接入层开发；<br>2.负责前端架构建设，公共组件的设计开发；<br>3.与客户端，后端工程师对接共同协作完成项目。<br>工作要求：<br>1.三年以上前端开发经验；    <br>2.JavaScript基础扎实，熟知ES6的语法特性；<br>3.对MVVM模式有深刻的理解，熟知主流框架的数据绑定原理；<br>4.熟练掌握flexbox布局；<br>5.熟悉Node环境下的开发；<br>6.积极主动，责任心强；<br>7.善于沟通，抗压能力强；<br>8.有React-Native／Weex开发经验优先。<br></p>\n        </div>\n    "
    },
    "msg": ""
}
```

> 如果对您有帮助，请 Star 支持一下,你的赞赏更是我不竭的动力

![赞赏一下呗](http://p0fy79s6b.bkt.clouddn.com/18-7-29/77608319.jpg)

