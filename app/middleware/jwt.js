'use strict';
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = (options, app) => {
  return async function setUserToken(ctx, next) {
    const authToken = ctx.headers.authorization;
    if (authToken) {
      try {
        const res = verifyToken(authToken);
        console.log(res);
        if (res.userId && res.username) {
        // 如果需要限制单端登录或者使用过程中废止某个token， 或者更改token的权限，也就是一旦JWT签发了，到期之前就会始终有效
        // 此处使用redis进行保存
          const redis_token = await app.redis.get(res.userId + res.username);
          if (authToken === redis_token) {
            ctx.locals.userId = res.userId;
            ctx.locals.username = res.username;
            await next();
          } else {
            ctx.body = {
              code: 401,
              msg: '你的账户在其他地方已登录',
            };
          }
        } else {
          ctx.body = {
            code: 401,
            msg: '登录状态已过期',
          };
        }
      } catch (error) {
        ctx.body = {
          code: 500,
          msg: error.message,
        };
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '请登录后操作',
      };
    }
  };
  function verifyToken(token) {
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
  }
};
