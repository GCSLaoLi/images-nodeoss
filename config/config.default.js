/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
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
  config.keys = appInfo.name + '_1599789509037_6625';

  // add your middleware config here
  config.middleware = [];
  config.multipart = {
    fileSize: '100mb',
    mode: 'file'
  };
  config.security = {
    csrf: {
      enable: false
    }
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,INFO'
  };
  // 靜態目錄及緩存設置
  config.static = {
    prefix: process.env.CORS,
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    preload: false,
    // maxAge: 31536000,
    maxAge: 0,
    buffer: false
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};
