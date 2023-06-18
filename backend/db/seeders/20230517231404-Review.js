
"use strict";

/** @type {import("sequelize-cli").Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        restaurantId: 1,
        userId: 2,
        description: "It was mangificent in my opinion",
        rating: 3
      },
      {
        restaurantId: 2,
        userId: 1,
        description: "It was mangificent in my opinion",
        rating: 3
      },
      {
        restaurantId: 3,
        userId: 2,
        description: "It was mangificent in my opinion",
        rating: 3

      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      description: { [Op.in]: ["It was magnificent", "It was mangificent in my opinion", "It was mangificent in my opinion"] }
    }, {});
  }
};
