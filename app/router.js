'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 登录接口， 获取token
  router.get('/api/v1/login', controller.users.setUserToken);
  router.get('/api/v1/userInfo', controller.users.login);
  router.get('/api/v1/register', controller.users.userRegister);
  // 获取用户列表
  router.get('/api/v1/users', controller.users.userPages);
};
