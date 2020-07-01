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
    ignore: [ '/api/v1/login', '/public/', '/api/v1/register', '/swagger-ui.html', '/swagger-doc', '/swagger-ui.css', '/swagger-ui-bundle.js', '/swagger-ui-standalone-preset.js' ],
  };
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      db: 0,
    },
  };
  // 配置上传
  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    fileExtensions: [ '.xls', '.txt' ], // 扩展几种上传的文件格式
  };
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'eic-egg',
      debug: false,
    },
  };
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'djtao接口',
      description: 'djtao接口 swagger-ui for egg', version: '1.0.0',
    },
    schemes: [
      'http',
      'https',
    ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    enableSecurity: false,
    // enableValidate: true,
    routerMap: true,
    enable: true,
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
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
