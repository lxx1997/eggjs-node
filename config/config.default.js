/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name;
  // 模版引擎的设定
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };
  // 使用中间件
  config.jwt = {
    enable: true,
    ignore: [ '/api/v1/login', '/public/', '/api/v1/register' ],
  };
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      db: 0,
    },
  };
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'eic-egg',
    },
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // add your middleware config here
  config.middleware = [ 'jwt' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
