"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const banners = require("../data/banners.json").map((banner) => {
      banner.createdAt = banner.updatedAt = new Date();
      return banner;
    });
    await queryInterface.bulkInsert("Banners", banners, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Banners", null, {});
  },
};
