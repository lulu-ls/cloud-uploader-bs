const STS = require('qcloud-cos-sts/sdk/sts');

class Cos {
  constructor() {
    // 配置参数
    this.config = {
      secretId: '', // 固定密钥
      secretKey: '', // 固定密钥
      proxy: '',
      host: 'sts..com', // 域名，非必须，默认为 sts.tencentcloudapi.com
      // endpoint: 'sts.internal.tencentcloudapi.com', // 域名，非必须，与host二选一，默认为 sts.tencentcloudapi.com
      durationSeconds: 1800, // 密钥有效期
      // 放行判断相关参数
      bucket: 'cloud--', // 换成你的 bucket
      region: 'ap-', // 换成 bucket 所在地区
      allowPrefix: 'user/', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
    };

    this.appId = this.config.bucket.slice(
      this.config.bucket.lastIndexOf('-'),
      this.config.bucket.length - 1
    );
  }

  getTempSecret() {
    return new Promise((resolve, reject) => {
      const scope = [
        {
          action: 'name/cos:PutObject',
          bucket: this.config.bucket,
          region: this.config.region,
          prefix: this.config.allowPrefix,
        },
      ];
      const policy = STS.getPolicy(scope);
      STS.getCredential(
        {
          secretId: this.config.secretId,
          secretKey: this.config.secretKey,
          proxy: this.config.proxy,
          policy: policy,
          durationSeconds: this.config.durationSeconds,
        },
        function (err, credential) {
          if (err) {
            return reject(err);
          }
          // console.log('getPolicy,getCredential:');
          // console.log(JSON.stringify(policy, null, '    '));
          // console.log(err || credential);
          return resolve(credential);
        }
      );
    });
  }
}

module.exports = new Cos();
