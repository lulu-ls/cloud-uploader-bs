const axios = require('axios');

export const http = (option) => {
    return new Promise((resolve, reject) => {
        if (!option) {
            reject('配置不能为空');
            return;
        }

        if (!option.url) {
            reject('url 能为空');
            return;
        }

        axios({
            method: option.method || 'post',
            url: option.url,
            data: option.data,
            header: option.header || {
                'contend-type': 'application/json; charset=utf-8'
            },
        }).then(data => {
            if (data && data.data) {
                if (data.data.code === 0) {
                    resolve(data.data.data);
                    return;
                }
                reject(`[${data.data.code}] ${data.data.msg}`);
            }
            reject('未返回任何信息');
        }).catch(err => {
            if (err && err.response && err.response.data) {
                reject(err.response.data);
                return;
            }

            reject(err);
        });
    });

};

export default axios;