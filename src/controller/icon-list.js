const app = require('express')();
app.get('/', function (req, res) {
  const iconList = [
    {
      icon: '../../images/dx.svg',
      name: '高校查询',
      url: '/pages/university/index'
    },
    {
      icon: '../../images/star.svg',
      name: '星座运势',
      url: '/pages/star/index'
    },
    {
      icon: '../../images/qrcode.svg',
      name: '维码生成',
      url: '/pages/qrcode/index'
    },
    {
      icon: '../../images/idcard.svg',
      name: '身份证解析',
      url: '/pages/idcard/index'
    },
    {
      icon: '../../images/mobile.svg',
      name: '手机归属地',
      url: '/pages/mobile/index'
    },
    {
      icon: '../../images/history.svg',
      name: '历史的今天',
      url: '/pages/todayOnHistory/eventList/index'
    },
    {
      icon: '../../images/bankcard.svg',
      name: '银行卡信息',
      url: '/pages/bankCard/index'
    },
    {
      icon: '../../images/pinyin2.svg',
      name: '查拼音',
      url: '/pages/pinyin/index'
    },
    {
      icon: '../../images/chinese.svg',
      name: '数字转大写',
      url: '/pages/numberToChinese/index'
    },
    {
      icon: '../../images/jitang.svg',
      name: '鸡汤文',
      url: '/pages/sentence/index'
    },
    {
      icon: '../../images/idiom.svg',
      name: '成语词典',
      url: '/pages/idiom/index'
    },
    {
      icon: '../../images/gs.svg',
      name: '个税计算',
      url: ''
    }
  ];
  res.API(iconList);
});

module.exports = app;
