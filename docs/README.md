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
服务器启动默认端口为3000


[TOC]

### 1.前端开发日报接口
说明:获取前端开发博客日报列表、推荐列表、单日文章列表数据 

#### 1.1 每10天日报列表  
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
返回数据()如下图:  

#### 1.3 单日日报内容
**必选参数:**  
`date`: 日期 20170522   

**接口地址:**  
`//one_day_list?date=20170521`  

**调用例子:**  
`http://localhost:3000/one_day_list?date=20170521`  
返回数据()如下图:  


### 2.妹纸图片福利接口
说明:获取图片列表数据、和某个妹纸图片集合 

#### 2.1 妹纸图片列表接口
**必选参数:**  
`page` : 页码 1

**接口地址:**  
`/list?page=2`  

**调用例子:**  
`http://localhost:3000/recommend_list`  
返回数据()如下图:  

#### 2.2 图片详情列表
**必选参数:**  
`id` :  列表下图片集合id  5525  

**接口地址:**  
`/img_view?id=5525`  

**调用例子:**  
`http://localhost:3000//img_view?id=5525`  
返回数据()如下图:  
```
{
    "msg": "success",
    "data": [
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/01.jpg",
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/02.jpg",
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/03.jpg",
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/04.jpg",
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/05.jpg",
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/06.jpg",
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/07.jpg",
        "http://mm.howkuai.com/wp-content/uploads/2017a/04/13/08.jpg"
    ],
    "code": 1
}
```


