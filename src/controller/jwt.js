const app = require('express')();
const Token = require('@/src/utils/jwt');
app.get('/', function (req, res) {
  //  加密
  const token = Token.encrypt({ id: 1 }, '1d');
  res.API(token);

  // const str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ4MTc0NDA4LCJleHAiOjE2NDgxNzQ0Njh9.iqrpT44gIa5Qs1Ii1lSu5NuIZoJv-uPCBGRRiE7IFl4';
  // const r = Token.decrypt(str);
  // res.API(r);
});
module.exports = app;
