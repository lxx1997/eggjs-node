'use strict';
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = {
  loginToken(data, expires = 60 * 60 * 24) {
    const exp = Math.floor(Date.now() / 1000) + expires;
    // 私钥，看生成方法
    const cert = fs.readFileSync(path.join(path.join(__dirname, '../public/rsa_private_key.pem')));
    const token = jwt.sign({
      data, exp,
    }, cert, { algorithm: 'RS256' });
    return token;
  },
  // 解析token， 取出用户id和用户名
  verifyToken(token) {
    // 获取公钥
    const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem'));
    let res = '';
    try {
      const result = jwt.verify(token, cert, { algorithms: [ 'RS256' ] }) || {};
      const { exp } = result;
      const current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (error) {
      console.log(error);
      throw (error);
    }
    return res;
  },
  // 获取创建人id和创建时间
  createUser(id) {
    return {
      create_by: id,
      create_date: Date().toLocaleString(),
    };
  },
};

