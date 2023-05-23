const db = require("../models"); // import the database model
const _ = require("lodash"); // import lodash library

module.exports = class detailPostsController {
  constructor(data) {
    this.detailPosts = data;
  }

  async create() {
    try {
      let response;
      await db.detailPosts.create({ ...this.detailPosts }).then(async (res) => {
        response = res.get({ plain: true });
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

};
