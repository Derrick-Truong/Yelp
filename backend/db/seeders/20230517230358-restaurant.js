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
        randomNum:'2b4e7d6a8f9c1e50c3f0b2d1895a6e7f'
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
        randomNum: 'd2e6b9c4f5a8e9d1c3b7f4e6a9d8c3b7'
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
        randomNum:'7e83f92d5a1c6b8f4d0e97b65c32a1f7'
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
        randomNum:'f1a0c8b7e9d4621530b46d34e62ef9c2'
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
        randomNum:'8f1e3a4b7c6d2f5a9d8c3b1e7f4d6a5'
      }
    ], options);

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Restaurants';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ["Candy House", "Not My Cup of Tea", "Perfect Land", 'Fun Land', 'Mid'] }
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



