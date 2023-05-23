/**
 * This module exports an object that contains all the controllers available in the application.
*/
const usersController = require("./users");
const postsController = require("./posts");
const reviewPostsController = require("./reviewPosts");
const detailPostsController = require("./detailsPosts");

module.exports = {
  usersController,
  postsController,
  reviewPostsController,
  detailPostsController
};
