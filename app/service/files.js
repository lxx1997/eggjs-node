// 保存文件和查询文件
'use strict';

const Service = require('egg').Service;

class FilesService extends Service {
  async uploadFile({ name, suffix, path }) {
    const { ctx, app } = this;
    const userid = await ctx.service.users.userId();
    try {
      const insertData = {
        name,
        suffix,
        path,
        ...ctx.helper.createUser(userid),
      };
      console.log(insertData);
      const result = await app.mysql.insert('eic-file', { ...insertData });
      return result;
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
  async getFileDetail(id) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.select('eic-file', { where: { id } });
      return result[0];
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
}

module.exports = FilesService;
