const UserORM = require('../../entity/userOrm');
async function query(req, res) {
  const data = await UserORM.findOne({
    where: { id: req.query.id }
  });
  res.API(data);
}

module.exports = query;
