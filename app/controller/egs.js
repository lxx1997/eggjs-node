'use strict';
const { Controller } = require('egg');
class EgsController extends Controller {

  async create() {
    // eslint-disable-next-line no-unused-vars
    const { ctx } = this;
    this.ctx.body = '创建';
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
  /**
   * @Summary 创建资源
   * @Router POST /resource2
   * @Request body createResource *body resourceInfo
   * @Request header string access_token
   * @Response 200 baseResponse
   */

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

module.exports = EgsController;
