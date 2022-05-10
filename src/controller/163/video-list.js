const app = require('express')();
const request = require('../../utils/request.js');

/**
 * get /api/163/video-list
 * @summary 163视频
 * @tags 163
 * @description 163视频 搞笑：Video_Funny 新闻现场：Video_Scene  萌物：Video_Adorable  猎奇：Video_Curious 音乐 ：Video_Music 小品 ：Video_Opusculum 影视：Video_Movie 军武 Video_Military
 * @param {string}  page.query.required  -  分页
 * @param {string}  type.query.required  -  类型 默认推荐
 */
app.get('/', function (req, res) {
  const pageSize = (req.query.page || 1) * 10 - 10;
  const type = req.query.type || 'Video_Recom';
  const host = '3g.163.com';
  const path = `/touch/nc/api/video/recommend/${type}/${pageSize}-20.do?callback=videoList`;
  const headers = {
    cookie:
      '_ntes_nuid=023d7a659e5cbbdc2607333212932bd6; nts_mail_user=1928@163.com:-1:1; mail_psc_fingerprint=e4bd802xc7ea01af6f85e7e0ef53b721a4; NTES_P_UTID=ktgfQhlP5otFsulnlUMJYrToekM8NqS9|1634049413; _ntes_nnid=023d7a659e5cbbdc2607333212932bd6,1636285469627; NTES_SESS=JWjEObG_Ca0IWnSqEOMs7Kd6BgUWRXuRrnjvE1HFWEAqWh3VWELSHaXAL5fuEGj9xxhCpDAMFeHwp50x_g9cRTDeT18Xr7SPIg_XtGMy.Oc6vHWRcV.WQkYlIZWJtUc7nNJhcN25i9ZGZmhFI948zcUT2dejqDaV4gME.Rx_t9jk2yUeKIt11k_shJIXUpLu5E1O17gkq_6wQPczrY0PBJV4e; S_INFO=1651495800|0|0&60##|ecitlm|; P_INFO=ecitlm@163.com|1651495800|0|mailmaster_ios|00&99|gud&1650948779&mailmaster_ios#gud&440300#10#0#0|150716&0|mailmaster_ios|ecitlm@163.com; ANTICSRF=78d18fda20a9568eb768ecda3fa17b87; hb_MA-9D99-92DF8361BA33_source=reg.163.com; _antanalysis_s_id=1652097239772; UM_distinctid=180a8ab52b4a0c-0b93ba648cb7bb-1f343371-1fa400-180a8ab52b5906; CNZZDATA1253186237=1859623887-1652088672-%7C1652088672; _ntes_newsapp_install=false; ariaDefaultTheme=undefined; CNZZDATA1256116812=240549915-1652095287-https%253A%252F%252F3g.163.com%252F%7C1652095287',
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
  };
  request
    .httpGet({ host, path, headers, status: true })
    .then(function (body) {
      console.log(body);
      let result = JSON.parse(body.match(/\[.*?\]/g));
      console.log(result);
      let r = result.map(item => {
        return {
          title: item.title,
          cover: item.cover,
          vid: item.vid,
          ptime: item.ptime,
          topicName: item.topicName,
          replyid: item.replyid,
          topicSid: item.topicSid
        };
      });
      return res.API(r);
    })
    .catch(function (err) {
      res.API_ERROR('服务器异常');
      console.log(err);
    });
});

module.exports = app;
