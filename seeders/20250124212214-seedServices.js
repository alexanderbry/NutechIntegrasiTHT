'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const services = require("../data/services.json").map((service) => {
      service.createdAt = service.updatedAt = new Date();
      return service;
    });
    await queryInterface.bulkInsert("Services", services, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
