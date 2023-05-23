const db = require("../models"); // import the database model
const _ = require("lodash"); // import lodash library

module.exports = class reviewPostsController {
  constructor(data) {
    this.reviewPosts = data;
  }

  async create() {
    try {
      let response;
      await db.reviewPosts.create({ ...this.reviewPosts }).then(async (res) => {
        response = res.get({ plain: true });
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

};
