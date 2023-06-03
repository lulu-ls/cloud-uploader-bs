const FeedbackModel = require('../model/feedback');

class Feedback {
  constructor() {}

  async save(comment = '') {
    await FeedbackModel.create({
      comment: comment,
    });
  }
}

module.exports = new Feedback();
