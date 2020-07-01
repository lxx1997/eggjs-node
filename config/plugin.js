'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  redis: {
    // false 启动redis
    enable: true,
    package: 'egg-redis',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc-feat',
  },
};
