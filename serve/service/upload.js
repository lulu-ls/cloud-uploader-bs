const fs = require('fs');

const Api = require('./api');

class Upload {
  constructor() {}

  async one(file = {}, cookie = '') {
    return Api.request('cloud', {
      cookie,
      songFile: {
        name: file.originalFilename,
        data: fs.readFileSync(file.filepath),
      },
    });
  }
}

module.exports = new Upload();
