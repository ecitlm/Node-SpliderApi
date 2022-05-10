let Sequelize = require('sequelize');
let Op = Sequelize.Op;
const University = require('./ORM');
async function universityQuery(req, res) {
  const type = req.query.type || '';
  const pageSize = 10;
  const page = req.query.page || 1;
  const province = req.query.province;
  const schoolname = req.query.schoolname || '';

  let whereInfo = {
    type: {
      [Op.like]: `%${type}%`
    },
    schoolname: {
      [Op.like]: `%${schoolname}%`
    }
  };

  if (province && province !== 'null' && province !== 'undefined') {
    whereInfo.province = province;
  }

  // if(!schoolname && schoolname ==='null' && schoolname ==='undefined'){
  //   delete whereInfo.schoolname;
  //
  // }

  const result = await University.findAndCountAll({
    order: [['id', 'ASC']], // 正常升序
    where: whereInfo,
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
// module.exports = {
//   universityQuery
// };

module.exports = universityQuery;
