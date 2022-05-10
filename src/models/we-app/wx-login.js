const wxUser = require('./ORM');
const WXBizDataCrypt = require('./WXBizDataCrypt');

/**
 * 1.获取用户openid
 * 2.根据用户id查询 用户信息
 * 3.如果没有查询到、通过获取解密数据、将数据保存数据库、返回数据
 */
async function getUserProfile(req, res, sessionKey, openid) {
  const appId = process.env.appid;
  const encryptedData = req.query.encryptedData;
  const iv = req.query.iv;
  const pc = await new WXBizDataCrypt(appId, sessionKey);
  const data = pc.decryptData(encryptedData, iv);
  data.openid = openid;
  createDB(data);
  return res.API(data);
}

async function queryUser(req, res, sessionKey, openid) {
  console.log(sessionKey, openid);
  try {
    const data = await wxUser.findOne({
      where: {
        openid: openid
      }
    });
    if (data) {
      res.API(data);
    } else {
      await getUserProfile(req, res, sessionKey, openid);
    }
  } catch (e) {
    console.log(e);
  }
}
function createDB(data) {
  return wxUser.create(data).catch(err => {
    console.log(err);
  });
}

module.exports = queryUser;
