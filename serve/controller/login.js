const KoaRouter = require('koa-router');

const LoginService = require('../service/login');
const Const = require('../config/const');

const router = new KoaRouter({ prefix: '/api/login' });

// 登录状态
router.post('/check', async (ctx) => {
  try {
    const res = await LoginService.check(ctx.session.loginCookie);
    ctx.success(res);
  } catch (e) {
    ctx.fail(1001, '检查登录状态失败');
  }
});

// 登录二维码
router.post('/qrcode', async (ctx) => {
  try {
    const res = await LoginService.generate();
    ctx.session.loginCookie = '';
    ctx.success(res);
  } catch (e) {
    ctx.fail(1001, '登录二维码获取失败');
  }
});

// 二维码状态
router.post('/code-state', async (ctx) => {
  // let n = ctx.session.views || 0;
  // ctx.session.views = ++n;
  // console.log(ctx.session.views);

  try {
    const key = ctx.request.body && ctx.request.body.key;
    if (!key) {
      return ctx.fail(1002, '无效的 key');
    }

    if (ctx.session.loginKey === key && ctx.session.loginCookie) {
      console.log('已登录成功');
      return ctx.success(1);
    }

    const res = await LoginService.state(key);

    if (res.code === Const.CLOUD_MUSIC_SCAN_FINISHED_STATUS) {
      ctx.session.loginCookie = res.cookie;
      ctx.session.loginKey = key;

      return ctx.success(1);
    }

    // if (res.code === Const.CLOUD_MUSIC_SCAN_WAIT_STATUS) {
    //
    // }

    if (res.code === Const.CLOUD_MUSIC_AUTH_WAIT_STATUS) {
      ctx.session.loginAvatar = res.avatarUrl || '';
      ctx.session.loginNickname = res.nickname || '';
      ctx.success(2);
    }

    // 如果二维码过期自动更新
    if (res.code === Const.CLOUD_MUSIC_SCAN_EXPIRE_STATUS) {
      return ctx.success(-1);
    }

    return ctx.success(0);
  } catch (e) {
    console.error(e);
    ctx.fail(1001, '接口错误[002]');
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
