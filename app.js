const express = require('express');
const http = require('http');
const app = express();
const router = express.Router();
//const routerConfig=require('./config/routes');


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});


const index = require('./routes/web/index');
const photo_type = require('./routes/api/photo/photo_type');
const photo_list = require('./routes/api/photo/photo_list');
const photo_view = require('./routes/api/photo/photo_view');

//音樂
const rank_list = require('./routes/api/music/rank_list');

app.use('/', index);
app.use('/photo_type',photo_type);
app.use('/photo_list',photo_list);
app.use('/photo_view',photo_view);
app.use('/rank_list',rank_list);

app.use(router);
app.listen(3001);
console.log("app start success port:3001");
