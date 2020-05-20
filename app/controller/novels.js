'use strict';

const Controller = require('egg').Controller;

class NovelsController extends Controller {
  // 创建数据
  async create() {
    const { ctx } = this;
    // this.ctx.body = '创建';
    const userid = await ctx.service.users.userId();
    const insertMsg = ctx.request.body;
    const result = ctx.service.novels.insertNovel({ userid, insertMsg });
    if (result.insertId) {
      ctx.body = {
        code: 200,
        data: {
          msg: '添加成功',
        },
      };
    }
  }
  // 删除数据
  async destroy() {
    const { ctx } = this;
    this.ctx.body = '删除';
  }
  // 修改数据
  async update() {
    const { ctx } = this;
    this.ctx.body = '修改';
  }
  // 查询数据  分页
  async show() {
    const { ctx } = this;
    this.ctx.body = '查询';
  }
  // 查询数据列表 不分页
  async index() {
    const { ctx } = this;
    this.ctx.body = '列表';
  }
  // 查询作者书籍数据  不分页
  async autherNovel() {
    const { ctx } = this;
    const userid = await ctx.service.users.userId();
    const result = await ctx.service.novels.autherNovel({ userid });
    this.ctx.body = '查询';
  }
}

module.exports = NovelsController;
