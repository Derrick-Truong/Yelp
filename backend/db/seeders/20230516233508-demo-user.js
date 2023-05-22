'use strict';

const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo',
        lastName:'Truong',
        email: 'demo@user.io',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Bill',
        lastName: 'Smith',
        email: 'Bill@user.io',
        username: 'Bill',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'Derrick',
        lastName:'Truong',
        email: 'Derrick@user.io',
        username: 'Derrick',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jessica',
        lastName: 'Truong',
        email: 'Jessica@user.io',
        username: 'Jessica',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Brandon',
        lastName: 'Truong',
        email: 'Brandon@user.io',
        username: 'Brandon',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Shirley',
        lastName: 'Truong',
        email: 'Shirley@user.io',
        username: 'Shirley',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo', 'Derrick', 'Bill', 'Shirley','Brandon','Jessica'] }
    }, {});
  }
};
