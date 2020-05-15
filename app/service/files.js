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
      const result = await app.mysql.insert('egg-file', insertData);
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

module.exports = FilesService;
