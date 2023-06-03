const KoaRouter = require('koa-router');

const FeedbackService = require('../service/feedback');
const Const = require('../config/const');

const router = new KoaRouter({ prefix: '/api/feedback' });

// 登录状态
router.post('/', async (ctx) => {
  const comment = ctx.request.body && ctx.request.body.comment;
  if (!comment) {
    return ctx.fail(1002, '提交反馈不能为空');
  }
  // console.log(comment);

  if (!Const.MYSQL) {
    ctx.fail(1005, '未开启反馈功能');
  }

  try {
    await FeedbackService.save(comment);
    ctx.success('提交成功,非常感谢您的反馈！');
  } catch (e) {
    console.error(e);
    ctx.fail(1005, '提交反馈失败');
  }
});

module.exports = router;

// router.post('/api/upload/key',async (ctx)=>{
//
//     const data = await Cos.getTempSecret()
//
//     ctx.success(data)
// });

// class Login {
//     async qrcode(){
//       return
//     }
//
//
//     async state(key){
//         return await LoginService.state(key)
//         // if (stateRes.body.code !== Const.CLOUD_MUSIC_SCAN_WAIT_STATUS) {
//         //     reject({code});
//         //     return;
//         // }
//         //
//         // // 如果二维码过期自动更新
//         // if (stateRes.body.code === Const.CLOUD_MUSIC_SCAN_EXPIRE_STATUS) {
//         //     reject('二维码过期')
//         // }
//
//     }
// }

// new Login().qrcode()
// new Login().state('1386bb80-98fb-43d3-bfae-03de0fd28077')
