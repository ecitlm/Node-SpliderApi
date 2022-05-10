const app = require('express')();
const request = require('../../utils/request.js');

/**
 * GET /api/tt/news-list
 * @tags 163
 * @summary 头条新闻
 * @description  0 热点新闻 1 社会新闻 2 娱乐新闻 3体育新闻 4美文 散文 5科技 6 财经 7 时尚
 * @param {string}  type.query.required  -  0 热点新闻 1 社会新闻 2 娱乐新闻 3体育新闻 4美文 散文 5科技 6 财经 7 时尚
 */
app.get('/', function (req, res) {
  const type = parseInt(req.query.type) || 8;
  // 0 热点新闻 1 社会新闻 2 娱乐新闻 3体育新闻 4美文 散文 5科技 6 财经 7 时尚
  const map = {
    0: '/list/?tag=news_hot&ac=wap&count=20&format=json_raw&as=A1A59982B911729&cp=5929E12752796E1&min_behot_time=0',
    1: '/list/?tag=news_society&ac=wap&count=20&format=json_raw&as=A195B9F229018CD&cp=592991783C9D8E1&min_behot_time=0',
    2: '/list/?tag=news_entertainment&ac=wap&count=20&format=json_raw&as=A1C51992996195E&cp=5929D119B58EFE1&min_behot_time=0',
    3: '/list/?tag=news_sports&ac=wap&count=20&format=json_raw&as=A1054902B911A1E&cp=592991AA81AEAE1&min_behot_time=0',
    4: '/list/?tag=news_essay&ac=wap&count=20&format=json_raw&as=A195495279C19DE&cp=5929C1F91DFEEE1&min_behot_time=0',
    5: '/list/?tag=news_tech&ac=wap&count=20&format=json_raw&as=A1854972BABC6FF&cp=592A9CC64FCFAE1&max_behot_time=0',
    6: '/list/?tag=news_finance&ac=wap&count=20&format=json_raw&as=A145E9025A6C78B&cp=592ACC87687B1E1&max_behot_time=0',
    7: '/list/?tag=news_fashion&ac=wap&count=20&format=json_raw&as=A1353902AA9C7F9&cp=592ADCD7CF89AE1&max_behot_time=0',
    8: '/list/?tag=news_hot&ac=wap&count=20&format=json_raw&as=A1A59982B911729&cp=5929E12752796E1&min_behot_time=0'
  };
  const path = map[type];
  const host = 'm.toutiao.com';
  const headers = {
    Cookie:
      '_S_DPR=1; _S_IPAD=0; _S_UA=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F96.0.4664.45%20Safari%2F537.36; tt_webid=7072000147563791879; n_mh=CbLxGSOPsHz0SsnNxB9g86-VHADgPoHSyMEyLMiYWl0; sid_guard=b8141b6ad8fce590bf5e304210446b9d%7C1646578466%7C5183999%7CThu%2C+05-May-2022+14%3A54%3A25+GMT; odin_tt=eaecc8d794b0dbb81811c80eb8665ee4f260adcdf07a2c8f838ebfd59ec8a19fc20bce1291a94078ecb824f7aae215f1; _S_WIN_WH=1920_937; x-jupiter-uuid=16521057696803428; W2atIF=1; _tea_utm_cache_1698=undefined; MONITOR_WEB_ID=37ddc9cb-21f3-4dbc-9664-be2e0db5615a; MONITOR_DEVICE_ID=0746beac-30f7-4078-86a1-7257eb151dda; msToken=tAWf2RQqEFcZsZXzrlpngmsorNRcHXwssGIeXQy0B3Q91GUaKIGdDgIjIh4AJBVmxpke85KkHGNIGA-d0TDcgjSWZylxhG0wgkXFKxI6SBI=; _tea_utm_cache_1286=undefined; MONITOR_WEB_ID=7072000147563791879; ttwid=1%7CWa5kxH4M2MLb0RBlgKurcNu5qHAM1Kvn9CnyNo_1SAo%7C1652105797%7C6913a9f311963485a4c04840b710094c4dcf6556b8a3a70f1e20196a9e3451d7'
  };
  request
    .httpGet({ host, path, status: true, headers })
    .then(function (result) {
      res.API(JSON.parse(result).data);
    })
    .catch(function (err) {
      res.API_ERROR('网络好像有点问题', 500);
      console.log(err);
    });
});
module.exports = app;
