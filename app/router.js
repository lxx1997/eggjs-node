'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // resource 接口实例
  router.resources('eg', 'api/v1/egs', controller.egs);
  // 登录接口， 获取token
  router.get('/api/v1/login', controller.users.setUserToken);
  router.get('/api/v1/register', controller.users.userRegister);
  // 获取用户列表
  router.get('/api/v1/users', controller.users.userPages);
  // 获取当前用户信息
  router.get('/api/v1/userinfo', controller.users.getUserInfo);
  // 编辑用户信息
  router.put('/api/v1/users', controller.users.editUser);

  //  上传文件
  router.post('/api/v1/files', controller.files.uploadFile);
  //  下载文件
  router.post('/api/v1/files/:id', controller.files.uploadFile);
  // 创建novel的增删改查接口
  router.resources('novels', 'api/v1/novels', controller.novels);
  // chapter 的增删改查接口
  router.resources('chapters', 'api/v1/chapters', controller.chapters);
};
