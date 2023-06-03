const KoaRouter = require('koa-router');
const { koaBody } = require('koa-body');

const Resp = require('../config/resp');
const LoginController = require('../controller/login');
const UploadController = require('../controller/upload');
const FeedbackController = require('../controller/feedback');

const router = new KoaRouter();

// 错误处理
router.use(Resp.routerResponse);

// 全局错误捕获
router.use(async (ctx, next) => {
  //通过try...catch来捕获异常
  try {
    await next();
  } catch (err) {
    console.log(err.message);
    //将捕获的异常信息返回给浏览器
    // ctx.fail(err ? err.message : '服务器错误');
    ctx.status = err.status || 500;
    ctx.body = err.message;
    // ctx.app.emit('error', err, ctx);
  }
});

// body
router.use(koaBody({})); // 设置上传文件大小最大限制，默认2M}

// 路由
router.use(LoginController.routes());
router.use(UploadController.routes());
router.use(FeedbackController.routes());

module.exports = router;
