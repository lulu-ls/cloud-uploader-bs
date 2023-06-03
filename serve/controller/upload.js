const KoaRouter = require('koa-router');
const { koaBody } = require('koa-body');
const Decimal = require('decimal.js');

const Const = require('../config/const');
const UploadService = require('../service/upload');
const SongModel = require('../model/song');

const router = new KoaRouter({ prefix: '/api/upload' });

// 文件处理
router.use(
  koaBody({ multipart: true, formidable: { maxFileSize: 50 * 1024 * 1024 } })
); // 设置上传文件大小最大限制，默认2M}

router.post('/one', async (ctx) => {
  const files = ctx.request.files;
  if (!files) {
    return ctx.fail(1001, '未上传任何文件');
  }

  const music = files.file;
  if (!music) {
    return ctx.fail(1001, '未获取到 file');
  }

  const cookie = ctx.session.loginCookie;
  if (!cookie) {
    return ctx.fail(-1, '未获取到登录信息');
  }

  const start = new Date().getTime();
  const res = await UploadService.one(music, ctx.session.loginCookie);
  const end = new Date().getTime();
  if (Const.MYSQL) {
    await SongModel.create({
      nickname: ctx.session.nickname || '',
      avatar: ctx.session.loginNickname || '',
      title: music.originalFilename,
      size: music.size,
      url: music.filepath,
      consuming: Number(new Decimal(end).sub(new Decimal(start))),
    });
  }

  if (res && res.status === Const.CLOUD_MUSIC_SUCCESS_STATUS) {
    // 发送上传成功消息到前端
    return ctx.success('上传成功');
  } else {
    console.error('上传失败');
    ctx.fail(1003, '上传失败');
  }
});

module.exports = router;

// new Login().qrcode()
// new Login().state('1386bb80-98fb-43d3-bfae-03de0fd28077')
