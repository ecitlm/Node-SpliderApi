/*
 * @Author: ecitlm 
 * @Date: 2017-05-27 14:52:05 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-05-28 20:53:15
 */
const express = require('express')
const http    = require('http')
const app     = express()


function requests(req, res) {
    var req = req;
    var res = res;
    var type=parseInt(req.query.type) || 0;
    var path;
    //0 热点新闻 1 社会新闻 2 娱乐新闻 3体育新闻 4美文 散文 5科技 6 财经 7 时尚
    switch (type)
    {
        case 0:
        path="/list/?tag=news_hot&ac=wap&count=20&format=json_raw&as=A1A59982B911729&cp=5929E12752796E1&min_behot_time=0";
        break;
        case 1:
        path="/list/?tag=news_society&ac=wap&count=20&format=json_raw&as=A195B9F229018CD&cp=592991783C9D8E1&min_behot_time=0";
        break;
        case 2:
        path="/list/?tag=news_entertainment&ac=wap&count=20&format=json_raw&as=A1C51992996195E&cp=5929D119B58EFE1&min_behot_time=0";
        break;
        case 3:
        path="/list/?tag=news_sports&ac=wap&count=20&format=json_raw&as=A1054902B911A1E&cp=592991AA81AEAE1&min_behot_time=0";
        break;
        case 4:
        path="/list/?tag=news_essay&ac=wap&count=20&format=json_raw&as=A195495279C19DE&cp=5929C1F91DFEEE1&min_behot_time=0";
        break;
        case 5:
        path="/list/?tag=news_tech&ac=wap&count=20&format=json_raw&as=A1854972BABC6FF&cp=592A9CC64FCFAE1&max_behot_time=0"
        break;
        case 6:
        path="/list/?tag=news_finance&ac=wap&count=20&format=json_raw&as=A145E9025A6C78B&cp=592ACC87687B1E1&max_behot_time=0"
        break;

        case 7:
        path="/list/?tag=news_fashion&ac=wap&count=20&format=json_raw&as=A1353902AA9C7F9&cp=592ADCD7CF89AE1&max_behot_time=0"
        break;
        default:
        path="/list/?tag=news_hot&ac=wap&count=20&format=json_raw&as=A1A59982B911729&cp=5929E12752796E1&min_behot_time=0";
       
    }
    var options = {
        hostname: 'm.toutiao.com',
        port: 80,
        path: path,
        method: 'get',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36"
        }//伪造请求头
    };

    var httpRequest = http.request(options, function (response) {

        console.log(res.statusCode);
        var body="" ;
        //res.on方法监听数据返回这一过程，"data"参数表示数数据接收的过程中，数据是一点点返回回来的，这里的chunk代表着一条条数据  
        response.on("data", function (chunk) {
            body +=chunk;
            console.log("----------------success----------------")
        })

        response.on("end", function () {
            console.log('----------------------------end output data--------------------------');
           res.send(JSON.parse(body))

        })
    })

    httpRequest.on("error", function () {
        res.send({
            msg: "糟糕!!! 网络好像有点问题",
            code: 0
        })
    })
    httpRequest.end(); //必须要要写，
}

app.get('/', function (req, res) {
    res.header("Content-Type", "application/json;charset=utf-8");
    requests(req, res)
});
module.exports = app;