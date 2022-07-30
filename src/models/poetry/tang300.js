let Sequelize = require('sequelize');
let Op = Sequelize.Op;
const Tang300 = require('../../entity/poetryOrm');
async function Tang300Query(req, res) {
  const contents = req.query.contents || '';
  const pageSize = 10;
  const page = req.query.page || 1;
  let whereInfo = {};
  if (contents) {
    whereInfo.contents = {
      [Op.like]: `%${contents}%`
    };
  }
  const result = await Tang300.findAndCountAll({
    order: [['id', 'ASC']], // 正常升序
    where: whereInfo,
    attributes: {
      exclude: ['id']
    },
    offset: (page - 1) * pageSize,
    limit: pageSize
  });
  const data = {
    result: result.rows,
    pagination: {
      page,
      pageSize,
      total: result.count
    }
  };
  if (result.rows) {
    res.API(data);
  }
}
module.exports = Tang300Query;
