'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Restaurants';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        address: "855 Broadway",
        city: "Millbrae",
        state: "California",
        country: "United States of America",
        title: "Fun Land",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 3,
      },
      {
        userId: 2,
        address: "249 90th St",
        city: "Daly City",
        state: "California",
        country: "United States of America",
        title: "Candy House",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 2,
      },
      {
        userId: 3,
        address: "1210 Palm Ave",
        city: "San Mateo",
        state: "California",
        country: "United States of America",
        title: "Mid",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 3,
      },
      {
        userId: 1,
        address: "1799 Eighth St",
        city: "Berkeley",
        state: "California",
        country: "United States of America",
        title: "Not My Cup of Tea",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 2,
      },
      {
        userId: 2,
        address: "350 23rd St",
        city: "Oakland",
        state: "California",
        country: "United States of America",
        title: "Perfect Land",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 2,
      }
    ], options);

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Restaurants';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      city: { [Op.in]: ["Milbbrae", "Daly City", "San Mateo", "Berkeley", "Oakland"] }
    }, options);

  }
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  }



