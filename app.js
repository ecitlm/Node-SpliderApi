const express = require('express');
const http = require('http');
const app = express();
var router = express.Router();

/**接口路由列表**/

var list = require('./routers/list');
var img_view = require('./routers/img_view');

app.use('/list', list);
app.use('/img_view',img_view);

app.use(router);
app.listen(3000);
console.log(3000);











