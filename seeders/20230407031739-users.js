"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    // Use queryInterface.bulkInsert to insert data into 'users' table
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Juan",
          type: "User",
          username: "test",
          password: "test",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pedro",
          type: "User",
          username: "test",
          password: "test",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Luis",
          type: "Admin",
          username: "test",
          password: "test",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    // Use queryInterface.bulkDelete to delete all data from 'users' table
    await queryInterface.bulkDelete("users", null, {});
  },
};
