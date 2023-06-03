const CloudApi = require('NeteaseCloudMusicApi');

class Api {
  constructor() {
    this.proxy = undefined;
    this.cookie = '';

    this.init();
  }

  init() {
    // this.proxy = '';
    this.cookie = '';
  }

  // 待优化
  request(name = '', option = {}) {
    if (name === '') {
      return;
    }
    option.proxy = this.proxy;
    // option.cookie = this.cookie; // + ' Appver=2.10.5';

    // option.cookie.appver = '2.10.5';

    if (!CloudApi[name]) {
      console.error('api 不存在，请检查方法名称');
      return;
    }

    return CloudApi[name](option);
  }
}

const ApiInstance = new Api();

module.exports = ApiInstance;
