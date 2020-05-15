// 文件上传接口
'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const awaitWriteStream = require('await-stream-ready').write;
class FilesController extends Controller {
  // 将文件地址上传到数据库，文件id返回给前端
  async uploadFile() {
    const { ctx } = this;
    const stream = ctx.getFileStream();
    const name = (await stream).filename;
    const suffix = name.split('.')[name.split('.').length - 1 ];
    const size = stream.size;
    this.createFolder('avator');
    const path = `${this.config.baseDir}/app/public/avator/${Date.now()}.${suffix}`;
    const serverPath = `/public/avator/${Date.now()}.${suffix}`;
    const writeStream = fs.createWriteStream(path);
    try {
      await awaitWriteStream((await stream).pipe(writeStream));
      const result = await ctx.service.files.uploadFile({ name, suffix, path: serverPath, size });
      ctx.body = {
        code: 200,
        data: {
          path: serverPath,
        },
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
    }
  }
  // 根据文件id拿取文件的访问地址
  async downloadFile() {

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
