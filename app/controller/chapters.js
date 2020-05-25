'use strict';
const { Controller } = require('egg');
class ChapterController extends Controller {

  async create() {
    // eslint-disable-next-line no-unused-vars
    const { ctx } = this;
    // eslint-disable-next-line no-unused-vars
    const parameter = ctx.request.body;
    const insert = {
      ...parameter,
      ...ctx.helper.createUser(),
      novel_id: parameter.novelId,
      novel_name: parameter.novelName,
      index: await ctx.service.chapters.getChapterIndex(parameter.novelId),
    };
    const result = await ctx.service.chapters.create(insert);
    this.ctx.body = {
      code: 200,
      data: {
        ...result,
      },
    };
  }
  async destroy() {
    // eslint-disable-next-line no-unused-vars
    const { ctx } = this;
    this.ctx.body = '删除';
  }
  async update() {
    // eslint-disable-next-line no-unused-vars
    const { ctx } = this;
    this.ctx.body = '修改';
  }
  async show() {
    // eslint-disable-next-line no-unused-vars
    const { ctx } = this;
    this.ctx.body = '查询';
  }
  async index() {
    // eslint-disable-next-line no-unused-vars
    const { ctx } = this;
    this.ctx.body = '列表';
  }
  async new() {
    // eslint-disable-next-line no-unused-vars
    const { ctx } = this;
    this.ctx.body = '创建页面';
  }
  async edit() {
    // eslint-disable-next-line no-unused-vars
    const { ctx } = this;
    this.ctx.body = '修改页面';
  }
}

module.exports = ChapterController;
