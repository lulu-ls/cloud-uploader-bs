# dockerfile以下
FROM node:alpine

##时区问题
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.nju.edu.cn/g' /etc/apk/repositories
RUN apk add --no-cache tzdata \
    && ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone

# Create app directory
WORKDIR /app
COPY . /app

RUN rm -f package-lock.json \
    && rm -rf .idea \
    && rm -rf node_modules \
    && npm config set registry "https://registry.npm.taobao.org/" \
    && npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN npm install pm2 -g
# Bundle app source

EXPOSE 3000
CMD [ "pm2-runtime", "start", "app.js" ]