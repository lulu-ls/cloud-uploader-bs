const Api = require('./api');
const Const = require('../config/const');

class Login {
  constructor() {
    this.name = 'Login';
  }

  async generate() {
    const key = await this.qrCodeKey();
    const info = await this.qrCodeImage(key);
    return {
      ...info,
      key,
    };
  }

  async qrCodeKey() {
    return new Promise(async (resolve, reject) => {
      // 获取 key
      const keyRes = await Api.request('login_qr_key');

      console.info(keyRes);

      if (keyRes && keyRes.status === Const.CLOUD_MUSIC_SUCCESS_STATUS) {
        // 获取二维码
        if (keyRes.body && keyRes.body.data && keyRes.body.data.unikey) {
          resolve(keyRes.body.data.unikey);
        } else {
          console.error('获取 union key 失败[1]');
          reject('获取 union key 失败[1]');
        }
      } else {
        console.error('获取 union key 失败[2]');
        reject('获取 union key 失败[2]');
      }
    });
  }

  async qrCodeImage(key) {
    return new Promise(async (resolve, reject) => {
      const createRes = await Api.request('login_qr_create', {
        key,
        qrimg: true,
      });

      console.info(createRes);

      if (createRes && createRes.status === Const.CLOUD_MUSIC_SUCCESS_STATUS) {
        if (createRes.body && createRes.body.data && createRes.body.data) {
          resolve(createRes.body.data);
        } else {
          console.error('获取 qr code image 失败[1]');
          reject('获取 qr code image 失败[1]');
        }
      } else {
        console.error('获取 qr code image 失败[2]');
        reject('获取 qr code image 失败[2]');
      }
    });
  }

  // 查看并更新扫码状态
  async state(key) {
    // 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
    return new Promise(async (resolve, reject) => {
      const stateRes = await Api.request('login_qr_check', {
        key,
      });

      console.info(stateRes);

      if (stateRes.status === Const.CLOUD_MUSIC_SUCCESS_STATUS) {
        if (stateRes.body) {
          resolve(stateRes.body);
        }
        reject('接口错误[001]');
      }
    });
  }

  // 检查登录状态
  async check(cookie = '') {
    if (!cookie) {
      return 0;
    }

    const res = await Api.request('login_status', { cookie });

    if (res && res.status === Const.CLOUD_MUSIC_SUCCESS_STATUS) {
      return 1;
    }

    return 0;
  }
}

module.exports = new Login();

// test code
// new Login().createQrCode('6624b2a2-2b27-45c6-8675-841b2d524a1c')
// new Login().qrCodeState('6624b2a2-2b27-45c6-8675-841b2d524a1c')
