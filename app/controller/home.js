'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async upload() {
    const { ctx } = this;
    this.logger.info('upload被调用了');
    ctx.body = { code: 1000 };
  }
}

module.exports = HomeController;
