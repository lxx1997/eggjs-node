'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller user
 */
class UserController extends Controller {


  async setUserToken() {
    const { ctx } = this;
    const username = ctx.request.query.username;
    const password = ctx.request.query.password;
    const loginUser = await ctx.service.users.getMyInfo({ username });
    if (username === loginUser.username && password === loginUser.password) {
      const userId = await ctx.service.users.getUserId(username);
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
    } else {
      ctx.body = {
        code: 500,
        msg: '用户名或密码错误',
      };
    }
    // const userId = ctx.service.users.getUserId(username);

  }


  // 用户注册
  async userRegister() {
    const { ctx } = this;
    const username = ctx.request.query.username;
    const password = ctx.request.query.password;
    const userInsert = await ctx.service.users.register({ username, password });
    if (userInsert === 'username') {
      ctx.body = {
        code: 500,
        message: '用户名已存在， 请重新输入',
      };
    } else {
      const userInfo = await ctx.service.users.getUserInfo(userInsert.insertId);
      ctx.body = {
        code: 200,
        data: userInfo,
      };
    }
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


  async editUser() {
    const { ctx } = this;
    const value = ctx.request.body.value;
    const field = ctx.request.body.field;
    if (!value || value === '') {
      ctx.body = {
        code: 500,
        message: 'value为必填项,必须填写',
      };
    } else if (!field || field === '') {
      ctx.body = {
        code: 500,
        message: 'field为必填项,必须填写',
      };
    } else {
      const userId = await ctx.service.users.userId();
      const result = ctx.service.users.editUser({ field, value, userId });
      ctx.body = {
        code: 200,
        data: result,
      };
    }
  }

  async getUserInfo() {
    const { ctx } = this;
    const userId = await ctx.service.users.userId();
    const result = await ctx.service.users.getUserInfo(userId);
    ctx.body = {
      code: 200,
      data: result,
    };
  }
}

module.exports = UserController;
