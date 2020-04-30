'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 用户登录
  async login() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      msg: '登录成功1',
    };
  }
  // 设置token
  async setUserToken() {
    const { ctx } = this;
    const username = ctx.request.query.username;
    const password = ctx.request.query.password;
    // const userId = ctx.service.users.getUserId(username);
    const userId = 123456;
    // 设置token， 传递用户的用户名和用户id
    const token = ctx.helper.loginToken({ username, userId }, 60 * 60 * 24);
    // 保存token到redis里面
    await ctx.service.users.setTokenRedis({ username, userId, token });
    ctx.body = {
      code: 200,
      data: {
        token,
        expires: this.config.login_token_time,
        username,
        password,
      },
      msg: '登录成功',
    };
  }
  // 用户注册
  async userRegister() {
    const { ctx } = this;
    const username = ctx.request.query.username;
    const password = ctx.request.query.password;
    const userInsert = await ctx.service.users.register({ username, password });
    const userInfo = await ctx.service.users.getUserInfo({ id: userInsert.insertId });
    ctx.body = {
      code: 200,
      data: userInfo,
    };
  }
  // 获取用户列表 分页
  async userPages() {
    const { ctx } = this;
    const page = ctx.request.query.page || 1;
    const pageSize = ctx.request.query.userPage || 20;
    const pageList = await ctx.service.users.getUserPage({ page, pageSize });
    ctx.body = {
      code: 200,
      data: {
        page,
        pageSize,
        data: pageList.list,
        total: pageList.total,
      },
    };
  }
}

module.exports = UserController;
