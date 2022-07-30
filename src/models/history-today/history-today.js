const HisToday = require('../../entity/history-today');
const crawlerRequest = require('@/src/utils/crawler-request');

function spiderData(req, res) {
  let date = req.query.date;
  let url = `https://www.chazidian.com/d/${date}/`;
  crawlerRequest({ url })
    .then($ => {
      let link = [];
      $('.histday_cont')
        .eq(0)
        .find('ul li')
        .each(function () {
          let year = $(this).find('a').first().text();
          let title = $(this).find('a').last().text();
          let href = $(this).find('a').last().attr('href');
          let tmp = {
            year,
            title: title,
            date,
            content_id: href.replace('https://www.chazidian.com/d/', '').match(/\/(\S*)\//)[1]
          };
          link.push(tmp);
        });
      createDB(link).then(r => {
        console.log(r);
      });
      res.API(link);
    })
    .catch(err => {
      console.log(err, 222);
      res.API_ERROR('请求异常', 5001);
    });
}
async function queryList(req, res) {
  const project = await HisToday.findAll({
    where: { date: req.query.date },
    attributes: ['date', 'title', 'year', 'content_id'] //返回特定字段
  });

  if (project.length) {
    res.API(project);
  } else {
    spiderData(req, res);
  }
}

async function createDB(data) {
  return await HisToday.bulkCreate(data);
}

module.exports = queryList;
