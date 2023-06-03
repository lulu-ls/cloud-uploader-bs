const Koa = require('koa');
// const session = require('koa-session');
const path = require('path');
const staticFiles = require('koa-static');
const logger = require('koa-logger');
const Moment = require('moment');
const session = require('koa-generic-session');
// var redisStore = require('koa-redis');

const Router = require('./router');
// const SessionConfig = require('./config/session');
const app = new Koa();

// logger
app.use(
  logger((str) => {
    // 使用日志中间件
    console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str);
  })
);

// session
app.keys = ['81873ab9-3807-4a04-9225-7483d2a5c831']; // session key
// app.use(session(SessionConfig, app));
app.use(session());

// static
console.info(`public dir：${__dirname}/public/`);
app.use(staticFiles(path.join(__dirname + '/public/')));

// 路由处理
app.use(Router.routes()).use(Router.allowedMethods());

// http.createServer(app.callback()).listen(3000);
app.listen(3000, () => {
  console.log('sever is listening in 3000');
});
