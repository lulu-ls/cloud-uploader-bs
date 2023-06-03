const DefaultSuccessCode = 0;
const DefaultErrorCode = 10001;

class Resp {
  constructor() {}

  static success(data) {
    return {
      code: DefaultSuccessCode,
      msg: 'success',
      data,
    };
  }

  static error(code, msg) {
    return {
      code,
      msg,
    };
  }

  static async routerResponse(ctx, next) {
    ctx.success = (data) => {
      ctx.type = 'json';
      ctx.body = {
        code: DefaultSuccessCode,
        msg: 'success',
        data: data,
      };
    };

    ctx.fail = (msg, code) => {
      ctx.type = 'json';
      ctx.body = {
        code: code || DefaultErrorCode,
        msg: msg || 'fail',
      };
    };

    await next();
  }
}

module.exports = Resp;
