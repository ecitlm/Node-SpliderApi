## Splider
基于Node 的一个网络爬虫 API接口

<a href="http://ecitlm.oschina.io/splider/docs/">查看文档</a>

### 环境要求
需要 NodeJS+express

### 安装
``` shell
$ git clone https://git.oschina.net/ecitlm/splider
$ npm install

### 运行
$ node app.js
```
服务器启动默认端口为3000 、启动之后就可以开启了接口服务了.


[menu]

### 1.前端开发日报接口
说明:获取前端开发博客日报列表、推荐列表、单日文章列表数据

#### 1.1 最新前10天日报列表
**必选参数:**
无

**接口地址:**
`/daily_list`

**调用例子:**
`http://localhost:3000/daily_list`

返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:
```javascript
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
```javascript
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
`//one_day_list?date=20170521`

**调用例子:**
`http://localhost:3000/one_day_list?date=20170521`

返回数据(由于长度就展示2条看)如下JSON:
```javascript
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


### 2.框架 top 排行榜
说明:获取前前端框架排名,我们可以看看web前端世界的框架排名

#### 2.1 获取前端框架top 20排名
**必选参数:**
`无` : 

**接口地址:**
`/web_frame`

**调用例子:**
`http://localhost:3000/web_frame`

返回数据(返回20条 由于长度就展示2条看)如下JSON:
```javascript
{
    "msg" : "success",
    "data": [
        {
            "index": "1",
            "thumb": "https://awesomes.oss-cn-beijing.aliyuncs.com/repo/151007151317-91-1.png?x-oss-process=style/subject_repo",
            "title": "\n            grunt\n          ",
            "description": "\n            Grunt: JavaScript 任务执行器\n          ",
            "url": "https://www.awesomes.cn/repo/gruntjs/grunt"
        },
        {
            "index": "2",
            "thumb": "https://awesomes.oss-cn-beijing.aliyuncs.com/repo/151003224032-16-1.png?x-oss-process=style/repo",
            "title": "\n  riot\n",
            "description": "\n A React-like, user interface library\n            ",
            "url": "https://www.awesomes.cn/repo/riot/riot"
        }
       ],
    "code": 1
    }
```


### 3.知乎日报
说明:获取每日知乎日报数据、日报详情数据

#### 3.1 每日知乎日报数据
**必选参数:**
`无参数` : 

**接口地址:**
`/zhihu_news`

**调用例子:**
`http://localhost:3000/zhihu_news`

返回数据(返回条看)如下JSON:
```javascript

```


#### 3.2 日报详情
**必选参数:**
`id` : 3977867

**接口地址:**
`/zhihu_news_detail?id=3977867`

**调用例子:**
`http://localhost:3000/zhihu_news_detail?id=3977867`

返回数据(返回条看)如下JSON:
```javascript
{
    "body": "<div class=\"main-wrap content-wrap\">\n<div class=\"headline\">\n\n<div class=\"img-place-holder\"></div>\n\n\n\n</div>\n\n<div class=\"content-inner\">\n\n\n\n\n<div class=\"question\">\n<h2 class=\"question-title\">北京大学 2010 级古生物专业为何只有一个学生？</h2>\n\n<div class=\"answer\">\n\n<div class=\"meta\">\n<img class=\"avatar\" src=\"http://pic1.zhimg.com/3df2a664c_is.jpg\">\n<span class=\"author\">周诗培</span>\n</div>\n\n<div class=\"content\">\n<p>看到个自己能答的问题了。</p>\r\n<p>首先有人所说的什么北大为一个人开设专业体现情怀什么的，没你们想象的那样高尚。真实情况是，这个专业就录了一个人，就这么简单。</p>\r\n<p>古生物专业属于北大元培学院。元培学院与常见的数学院物理学院中文系之内的院系不同，元培学院并不是一个按照专业划分的学院，而是一个住宿学院。学院里的学生可以自由选择其他院系的专业，例如信科，光华等，同时在选课上比专业院系的同学有更大的自由。除了选择其他院系的专业，元培学生还可以选择本院的三个专业：古生物，政经哲和外语外史。</p>\r\n<p>元培学院自己的专业的特点是，只有元培的学生才能选；课程综合性强，从不同的院系的课程中选取不同的课程组成自己的培养计划。古生物专业就是建立在地空学院，生科院等课程上的。</p>\r\n<p>元培学院的学生在大二上分流，确定自己的专业。这时候如果有人选择古生物，那么这一届古生物就有学生。学生按照培养方案选择课程，然后到所在院系上课。学校并不需要为这个学生专门开一门课程。</p>\r\n<p>报考北京大学元培学院的话，会有北大唯一的本科生男女混住宿舍楼，有不同专业的同学同居一寝的混宿制度。有点不好就是，别人问你学什么专业的时候，你会非常纠结&hellip;&hellip;</p>\r\n<p>利益相关，我是元培学院的学生。</p>\n</div>\n</div>\n\n\n<div class=\"view-more\"><a href=\"http://www.zhihu.com/question/24170880\">查看知乎讨论<span class=\"js-question-holder\"></span></a></div>\n\n</div>\n\n\n</div>\n</div>",
    "image_source": "Yestone.com 版权图片库",
    "title": "不是北大为一个人开专业，而是这个专业只招了一个人",
    "image": "https://pic4.zhimg.com/33adaf08d180ae6fcfac5faa8db7afe7.jpg",
    "share_url": "http://daily.zhihu.com/story/3977867",
    "js": [
        "http://news-at.zhihu.com/js/story.js?v=97942"
    ],
    "ga_prefix": "061809",
    "images": [
        "http://p1.zhimg.com/dd/c7/ddc75c460475d6e634158a3876d29f9e.jpg"
    ],
    "type": 0,
    "id": 3977867,
    "css": [
        "http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3"
    ]
}
```

### 4.今天头条数据新闻
说明:获取新闻头条分类新闻、新闻详情

#### 4.1 新闻头条新闻列表
**必选参数:**
`type` : 新闻类型 <br />   0 热点新闻 1 社会新闻 2 娱乐新闻 3体育新闻 4美文
  <table>
<tr>
	<td>类型</td>
	<td>0</td>
	<td>1</td>
	<td>2</td>
	<td>3</td>
	<td>4</td>

</tr>

<tr>
	<td>名称</td>
	<td>热点</td>
	<td>社会</td>
	<td>娱乐</td>
	<td>体育</td>
	<td>美文</td>

</tr>
</table>



**接口地址:**
`/news_list?type=1`

**调用例子:**
`http://localhost:3000/news_list?type=1`

返回数据(由于长度就展示2条看)如下JSON:
```javascript

```

#### 4.2 新闻详情数据
**必选参数:**
`item_id` : 新闻类型 <br /> 

**接口地址:**
`/news_detail?item_id=item_id`

**调用例子:**
`http://localhost:3000/news_detail?item_id=64246032347483345941`

返回数据(由于长度就展示2条看)如下JSON:
```javascript
{
    "_ck": {},
    "data": {
        "detail_source": "东方IC图说国际",
        "media_user": {
            "no_display_pgc_icon": false,
            "avatar_url": "http://p3.pstatp.com/thumb/ef500036ebc81557fb9",
            "id": "5784742177",
            "screen_name": "东方IC图说国际"
        },
        "publish_time": 1495844280,
        "title": "埃及一大巴遭枪击28人死亡 遇难者葬礼举行",
        "url": "http://m.dfic.cn/ttPhoto/6277",
        "is_original": false,
        "is_pgc_article": false,
        "content": "<div class=\"gallery\"><div class=\"image_content\"><p class=\"image_title\"></p><img src=\"http://p3.pstatp.com/large/22b800052b6615dfc09e\" img_width=\"900\" img_height=\"625\" inline=\"0\" alt=\"埃及一大巴遭枪击28人死亡 遇难者葬礼举行\" onerror=\"javascript:errorimg.call(this);\"><p class=\"image_desc\">当地时间2017年5月26日，埃及开罗，一名大巴枪击的受害女子被送往医院。据埃及安全部门称，一辆满载科普特基督徒的公交车在该国明亚省遭不明身份武装分子枪击。埃及卫生部官员表示，袭击造成至少28人死亡，25人受伤。（图片署名： 东方IC）    \"</p></div><div class=\"image_content\"><p class=\"image_title\"></p><img src=\"http://p3.pstatp.com/large/22b800052b67152267fe\" img_width=\"900\" img_height=\"495\" inline=\"0\" alt=\"埃及一大巴遭枪击28人死亡 遇难者葬礼举行\" onerror=\"javascript:errorimg.call(this);\"><p class=\"image_desc\">当地时间2017年5月26日，埃及明亚省，安全人员站在遭袭击的大巴旁。据埃及安全部门称，一辆满载科普特基督徒的公交车在该国明亚省遭不明身份武装分子枪击。埃及卫生部官员表示，袭击造成至少28人死亡，25人受伤。（图片署名： 东方IC）    \"</p></div><div class=\"image_content\"><p class=\"image_title\"></p><img src=\"http://p9.pstatp.com/large/22bf000535650aa2e1e0\" img_width=\"900\" img_height=\"600\" inline=\"0\" alt=\"埃及一大巴遭枪击28人死亡 遇难者葬礼举行\" onerror=\"javascript:errorimg.call(this);\"><p class=\"image_desc\">当地时间2017年5月26日，埃及明亚省，大巴袭击遇难者的葬礼举行，亲属悲痛欲绝。据埃及安全部门称，一辆满载科普特基督徒的公交车在该国明亚省遭不明身份武装分子枪击。埃及卫生部官员表示，袭击造成至少28人死亡，25人受伤。（图片署名： 东方IC）    \"</p></div><div class=\"image_content\"><p class=\"image_title\"></p><img src=\"http://p1.pstatp.com/large/22bb0004ed4b8ed54b1f\" img_width=\"900\" img_height=\"600\" inline=\"0\" alt=\"埃及一大巴遭枪击28人死亡 遇难者葬礼举行\" onerror=\"javascript:errorimg.call(this);\"><p class=\"image_desc\">当地时间2017年5月26日，埃及明亚省，大巴袭击遇难者的葬礼举行，亲属悲痛欲绝。据埃及安全部门称，一辆满载科普特基督徒的公交车在该国明亚省遭不明身份武装分子枪击。埃及卫生部官员表示，袭击造成至少28人死亡，25人受伤。（图片署名： 东方IC）    \"</p></div><div class=\"image_content\"><p class=\"image_title\"></p><img src=\"http://p1.pstatp.com/large/22c000050b6e4a7c694a\" img_width=\"900\" img_height=\"600\" inline=\"0\" alt=\"埃及一大巴遭枪击28人死亡 遇难者葬礼举行\" onerror=\"javascript:errorimg.call(this);\"><p class=\"image_desc\">当地时间2017年5月26日，埃及开罗，医疗人员在医院外将受害女子从救护车上抬下。据埃及安全部门称，一辆满载科普特基督徒的公交车在该国明亚省遭不明身份武装分子枪击。埃及卫生部官员表示，袭击造成至少28人死亡，25人受伤。（图片署名： 东方IC）    \"</p></div><div class=\"image_content\"><p class=\"image_title\"></p><img src=\"http://p3.pstatp.com/large/22b800052b6972f16de1\" img_width=\"900\" img_height=\"600\" inline=\"0\" alt=\"埃及一大巴遭枪击28人死亡 遇难者葬礼举行\" onerror=\"javascript:errorimg.call(this);\"><p class=\"image_desc\">当地时间2017年5月26日，埃及明亚省，大巴袭击遇难者的葬礼举行，亲属悲痛欲绝。据埃及安全部门称，一辆满载科普特基督徒的公交车在该国明亚省遭不明身份武装分子枪击。埃及卫生部官员表示，袭击造成至少28人死亡，25人受伤。（图片署名： 东方IC）    \"</p></div><div class=\"image_content\"><p class=\"image_title\"></p><img src=\"http://p3.pstatp.com/large/22b70008fd0505f16dc6\" img_width=\"900\" img_height=\"600\" inline=\"0\" alt=\"埃及一大巴遭枪击28人死亡 遇难者葬礼举行\" onerror=\"javascript:errorimg.call(this);\"><p class=\"image_desc\">当地时间2017年5月26日，埃及明亚省，大巴袭击遇难者的葬礼举行，亲属悲痛欲绝。据埃及安全部门称，一辆满载科普特基督徒的公交车在该国明亚省遭不明身份武装分子枪击。埃及卫生部官员表示，袭击造成至少28人死亡，25人受伤。（图片署名： 东方IC）    \"</p></div></div>",
        "source": "东方IC图说国际",
        "video_play_count": 0
    },
    "success": true
}

```




### X.妹纸图片福利接口
说明:获取美女分类、分类下图片列表、图片列表数据、和某个妹纸图片集合

#### X.1 妹纸美女类型分类
**必选参数:**
`无` :

**接口地址:**
`/classify`

**调用例子:**
`http://localhost:3000/classify`

返回数据(由于长度就展示2条看)如下JSON:
```javascript
{
    "msg": "success",
    "data": [
        {
            "title": "清纯",
            "id": "qingchun"
        },
        {
            "title": "私房",
            "id": "sifang"
        }
    ],
    "code": 1
}
```

#### X.2 妹纸分类下 图片列表接口
**必选参数:**
`tags` : 分类 如： qingchun

**接口地址:**
`/classify_tags_list?tags=luoli`

**调用例子:**
`http://localhost:3000/classify_tags_list?tags=luoli`

返回数据(由于长度就展示2条看)如下JSON:
```javascript
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

#### X.3 图片详情列表
**必选参数:**
`id` :  列表下图片集合id  5525

**接口地址:**
`/img_view?id=5525`

**调用例子:**
`http://localhost:3000//img_view?id=5525`

返回数据如下JSON:
```javascript
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



