let Sequelize = require('sequelize');
let Op = Sequelize.Op;
const Idiom = require('./ORM');

async function query(req, res) {
  const word = req.query.word;
  let whereInfo = {
    word: {
      [Op.like]: `%${word}%`
    }
  };
  const result = await Idiom.findAndCountAll({
    order: [['id', 'ASC']], // 正常升序
    where: whereInfo,
    limit: 15
  });
  const data = {
    result: result.rows,
    pagination: {
      total: result.count
    }
  };
  if (result.rows) {
    res.API(data);
  }
}

module.exports = query;
