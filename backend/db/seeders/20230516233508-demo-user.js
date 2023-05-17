'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo',
        password: 'password'
      },
      {
        email: 'Kisha@user.io',
        username: 'Kisha',
        password: 'password'
      },
      {
        email: 'Derrick@user.io',
        username: 'Derrick',
        password: 'password'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo', 'Derrick', 'Kisha'] }
    }, {});
  }
};
