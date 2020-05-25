'use strict';

const Service = require('egg').Service;

class ChaptersService extends Service {
  // 插入章节内容
  async create(insert) {
    const { ctx, app } = this;
    try {
      const insertResult = await app.mysql.insert('eic-chapter', {
        ...insert,
      });
      console.log(insertResult);
      return insertResult;
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
  async search(id) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.select('eic-chapter', { id });
      return result;
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
  async getChapterIndex(novelId) {
    const { ctx, app } = this;
    try {
      const sql = 'select MAX(index) as index from `eic-chapter` where novel_id = ?';
      const result = await app.mysql.query(sql, [ novelId ]);
      console.log(result);
      return result;
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
}

module.exports = ChaptersService;
