'use strict';
const fs = require('mz/fs');
const path = require('path');
const pump = require('mz-modules/pump');
const moment = require('moment');
const uuid = require('uuid');

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    this.logger.info(ctx.request);
    ctx.body = 'hi, egg';
  }
  async upload() {
    const { ctx } = this;
    this.logger.info('upload被调用了');
    this.logger.info(ctx.request.body);
    const file = ctx.request.files[0];
    let filename = '/未指定.txt';
    if (!file) return ctx.throw(400, '未上传文件!');
    if (!ctx.request.body.key) {
      filename = moment().format('YYYYMMDD') + '/' + uuid.v1() + path.extname(file.filename).toLowerCase();
    } else { filename = ctx.request.body.key; }


    const targetPath = path.join(this.config.baseDir, 'app/public', filename);
    const dirname = path.dirname(targetPath);
    this.logger.info({ dirname });
    await this.mkdirsSync(dirname);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);

    try {
      await pump(source, target);
      ctx.logger.warn('save %s to %s', file.filepath, targetPath);
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }
    ctx.body = { code: 1000, url: (process.env.WEB_ROOT || 'https://oss.dev.lidong.xin/') + filename };
  }
  async mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    if (this.mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

module.exports = HomeController;
