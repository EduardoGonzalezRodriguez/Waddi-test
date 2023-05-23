const db = require("../models"); // import the database model
const _ = require("lodash"); // import lodash library
const { Op } = require("sequelize");

module.exports = class postsController {
  constructor(data) {
    this.post = data;
  }

  async get() {
    try {
      const response = await db.posts.findAll({
        where: this.post,
        raw: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const where = this.post.startedDate && this.post.endDate ? {
        createdAt: {
          [Op.between]: [this.post.startedDate, this.post.endDate],
        },
      } : {}
      const response = await db.posts.findAll({
        where: where,
        order: [["createdAt", "DESC"]],
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create() {
    try {
      let response;
      await db.posts.create({ ...this.post }).then(async (res) => {
        response = res.get({ plain: true });
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update() {
    try {
      await db.posts.update(this.post, {
        where: { id: this.post.id },
      });
      const response = await db.posts.findAll({
        where: { id: this.post.id },
        raw: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    try {
      await db.posts.destroy({ where: { id: this.post.id } });
      return "Post deleted correctly";
    } catch (error) {
      throw error;
    }
  }
};
