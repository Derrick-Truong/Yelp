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
        address: "12 Poplar St",
        city: "Millbrae",
        state: "California",
        country: "United States of America",
        title: "Fun Land",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 3
      },
      {
        userId: 2,
        address: "35 Depressing Lane",
        city: "Smiles",
        state: "Texas",
        country: "United States of America",
        title: "Candy House",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 2
      },
      {
        userId: 3,
        address: "123 Left Corner",
        city: "Righty",
        state: "Alaska",
        country: "United States of America",
        title: "Mid",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 3
      },
      {
        userId: 1,
        address: "456 Middle",
        city: "Nowhere",
        state: "Missouri",
        country: "United States of America",
        title: "Not My Cup of Tea",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 2
      },
      {
        userId: 2,
        address: "333 Right Corner",
        city: "Halibut",
        state: "Arkansas",
        country: "United States of America",
        title: "Perfect Land",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 2
      }
    ], options);

  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Restaurants';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ["Candy House", "Not My Cup of Tea", "Perfect Land"] }
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



