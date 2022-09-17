const HisToday = require('../../entity/historyTodayOrm');
const crawlerRequest = require('@/src/utils/crawler-request');

function spiderData(req, res) {
  let { date, content_id } = req.query;
  let url = `https://www.chazidian.com/d/${date}/${content_id}/`;
  crawlerRequest({ url })
    .then($ => {
      const rich_text = $('.hist_actcont')
        .prop('outerHTML')
        .replace(/<img.*?>/gi, '');
      const title = $('.hist_actcont h1').text();
      if (rich_text) {
        updateDB(rich_text, content_id).then(r => {
          console.log('success', r);
        });
      }
      res.API({
        rich_text,
        title
      });
    })
    .catch(() => {
      res.API_ERROR('请求异常', 500);
    });
}

async function queryDetail(req, res) {
  const project = await HisToday.findOne({
    where: { content_id: req.query.content_id },
    attributes: ['title', 'content_id', 'rich_text'] //返回特定字段
  });
  console.log(project);
  if (!project) {
    res.API_ERROR('不存在该条数据', 1001);
  }
  if (project && project.rich_text) {
    return res.API(project);
  } else {
    spiderData(req, res);
  }
}
async function updateDB(val, content_id) {
  return await HisToday.update(
    {
      rich_text: val
    },
    {
      where: {
        content_id: content_id
      }
    }
  );
}

module.exports = queryDetail;
