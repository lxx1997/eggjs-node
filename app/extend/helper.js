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
};
