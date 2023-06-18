// "use strict";

/** @type {import("sequelize-cli").Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "https://handletheheat.com/wp-content/uploads/2021/06/homemade-vanilla-ice-cream.jpg"

      },
      {
        reviewId: 2,
        url: "https://res.cloudinary.com/simpleview/image/upload/v1595263845/clients/oakland/cookiebarcreamery_Instagram_1425_ig_17979428566155373_c0940066-fafe-4cfd-bb24-7d02f7c9de8a.jpg"
      },
      {
        reviewId: 3,
        url: "https://laurenslatest.com/wp-content/uploads/2020/08/vanilla-ice-cream-5-copy.jpg"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["https://handletheheat.com/wp-content/uploads/2021/06/homemade-vanilla-ice-cream.jpg", "https://res.cloudinary.com/simpleview/image/upload/v1595263845/clients/oakland/cookiebarcreamery_Instagram_1425_ig_17979428566155373_c0940066-fafe-4cfd-bb24-7d02f7c9de8a.jpg", "https://laurenslatest.com/wp-content/uploads/2020/08/vanilla-ice-cream-5-copy.jpg"] }
    }, {});
  }
};
