/**
 * @description
 * @param {type}
 * @date: 2022/4/1
 * @return: {}
 */
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;
class Token {
  static encrypt(data, time) {
    // data加密数据，time过期时间
    return jwt.sign(data, jwtSecret, { expiresIn: time });
  }
  static decrypt(token) {
    try {
      let data = jwt.verify(token, jwtSecret);
      return {
        token: true,
        id: data.id
      };
    } catch (e) {
      return {
        token: false,
        data: e
      };
    }
  }
}
module.exports = Token;
