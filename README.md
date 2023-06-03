# cloud-uploader-bs

## 上传音乐至网易音乐云盘，b/s，项目界面

![image](https://github.com/lulu-ls/cloud-uploader-bs/assets/28334630/3eaf8100-eda9-46e2-815b-af4dd18d58a2)

## 项目目录
```
  - serve # 后端项目 nodejs + koa2
  -- # 注意：反馈功能和上传日志记录需要 mysql 环境（serve/config/db.js 进行配置），并且将（serve/config/const.js 中的 MYSQL 修改为 true）即可，不需要的可以直接不管
  - web # 前端项目 vue3
```
## 环境要求
```
nodejs 14 以上（下载地址(https://nodejs.org/en)）
```

## 启动方式
```
# 后端项目 进入 serve 目录 执行
npm run start 

# 后端public 已打好包前端 访问即可
http://127.0.0.1:3000

# 如果您需要对前端内容进行修改
# 进入 web 目录 执行
npm run serve
```

