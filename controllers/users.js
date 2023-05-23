const db = require("../models"); // import the database model
const _ = require("lodash"); // import lodash library

module.exports = class usersController {
  constructor(data) {
    this.user = data;
  }

  async get() {
    try {
      const response = await db.users.findAll({
        where: this.user,
        raw: true,
      });
      response.password = ""
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await db.users.findAll({});
      response.map((o) => {
        o.password = ""
      })
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create() {
    try {
      let response;
      await db.users.create({ ...this.user }).then(async (res) => {
        response = res.get({ plain: true });
      });
      response.password = ""
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update() {
    try {
      await db.users.update(this.user, {
        where: { id: this.user.id },
      });
      const response = await db.users.findAll({
        where: { id: this.user.id },
        raw: true,
      });
      response.password = ""
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    try {
      await db.users.destroy({ where: { id: this.user.id } });
      return "User deleted correctly";
    } catch (error) {
      throw error;
    }
  }
};
