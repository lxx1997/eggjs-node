// 文件上传接口
'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
class FilesController extends Controller {
  // 将文件地址上传到数据库，文件id返回给前端
  async uploadFile() {
    const { ctx } = this;
    const stream = ctx.getFileStream();
    const name = (await stream).filename;
    const suffix = name.split('.')[name.split('.').length - 1 ];
    const size = stream.size;
    const url = `${this.config.baseDir}/app/public/avator/`;
    if (!fs.existsSync(url)) {
      fs.mkdirSync(url);
    }
    const path = `${this.config.baseDir}/app/public/avator/${Date.now()}.${suffix}`;
    const serverPath = `/public/avator/${Date.now()}.${suffix}`;
    try {
      const result = await ctx.service.files.uploadFile({ name, suffix, path: serverPath, size });
      if (result) {
        const file = await ctx.service.files.getFileDetail(result.insertId);
        const writeStream = fs.createWriteStream(path);
        awaitWriteStream((await stream).pipe(writeStream));
        ctx.body = {
          code: 200,
          data: {
            ...file,
          },
        };
      } else {
        await sendToWormhole(stream);
        ctx.body = {
          code: 500,
          msg: '文件写入失败，请联系管理员',
        };
      }
    } catch (error) {
      await sendToWormhole(stream);
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
  // 根据文件id拿取文件的访问地址
  async downloadFile() {
    const { ctx } = this;
    const id = ctx.request.body.id;
    const result = await ctx.service.files.getFileDetail(id);
    ctx.body = {
      code: 200,
      data: result,
    };
  }
  async createFolder(name) {
    fs.mkdir(`${this.config.baseDir}/app/public/${name}`, err => {
      if (err) {
        console.error('生成文件夹失败');
      } else {
        console.log('生成文件夹成功');
      }
    });
  }
}

module.exports = FilesController;
