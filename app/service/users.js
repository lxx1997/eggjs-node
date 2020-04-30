'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  async getUserInfo({ id }) {
    const { app, ctx } = this;
    console.log(id);
    try {
      const result = await app.mysql.select('eic-user', { where: { id } });
      console.log(result, id);
      return result;
    } catch (error) {
      ctx.body = {
        code: 500,
        message: error.message,
      };
    }
  }
  async setTokenRedis({ username, userId, token }) {
    const { app } = this;
    // app.redis.get('loginToken').set(userId + username, token, 'ex', 60 * 60 * 24);
    app.redis.set(userId + username, token, 'ex', 60 * 60 * 24);
  }
  async parseToken(res) {
    const { app } = this;
    const { userId, username } = res;
    return app.redis.get('loginToken').get(userId + username);
  }
  async register({ username, password }) {
    const { app, ctx } = this;
    try {
      const result = await app.mysql.insert('eic-user', { username, password });
      return result;
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
  async getUserPage({ page, pageSize }) {
    const { ctx, app } = this;
    try {
      console.log(page, pageSize);
      const list = await app.mysql.query('select * from `eic-egg`.`eic-user` limit ?, ?', [ (page - 1) * pageSize, page * pageSize ]);
      const total = await app.mysql.query('select count(id) as count from `eic-egg`.`eic-user`', '');
      console.log(total[0].count);
      return { list, total: total[0].count };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
}
module.exports = UserService;
