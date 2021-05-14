'use strict';
const { roles } = require('../../config/constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { ENUM: enumSequelize } = Sequelize;
    return queryInterface.addColumn('users', 'role', {
      type: enumSequelize(Object.values(roles)),
      defaultValue: roles.REGULAR
    });
  },
  down: queryInterface =>
    Promise.all([
      queryInterface.removeColumn('users', 'role'),
      queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role"')
    ])
};
