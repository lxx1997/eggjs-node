'use strict';

const Service = require('egg').Service;

class NovelsService extends Service {
  // 创建novel
  async insertNovel({ userid, insertMsg }) {
    const { app, ctx } = this;
    const data = {
      ...insertMsg,
      ...ctx.helper.createUser(userid),
      auther: userid,
    };
    try {
      const result = await app.mysql.insert('eic-novels', { ...data });
      return result;
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
  // 查询当前登录人的小说 novel
  async autherNovel({ userid }) {
    const { app, ctx } = this;
    try {
      const sql = 'select * from `eic-egg`.`eic-novel` where auther = ?';
      const result = await app.mysql.query(sql, [ userid ]);
      return result;
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
  // 查询当前登录人的小说 novel
  async searchNovel(body) {
    const { app, ctx } = this;
  }
}

module.exports = NovelsService;
