'use strict';
const { positions } = require('../../config/constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { ENUM: enumSequelize } = Sequelize;
    return Promise.all([
      queryInterface.addColumn('users', 'position', {
        type: enumSequelize(Object.values(positions).map(position => position.label)),
        defaultValue: positions.DEVELOPER.label
      }),
      queryInterface.createTable('raitings', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        raiting_user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,

          references: {
            model: 'users',
            key: 'id'
          }
        },
        weet_id: {
          type: Sequelize.INTEGER,
          allowNull: false,

          references: {
            model: 'weets',
            key: 'id'
          }
        },
        score: { type: Sequelize.INTEGER, allowNull: false, values: [-1, 1] },
        created_at: { type: Sequelize.DATE },
        updated_at: { type: Sequelize.DATE }
      })
    ]);
  },

  down: queryInterface =>
    Promise.all([
      queryInterface.removeColumn('users', 'position'),
      queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_position"'),
      queryInterface.dropTable('raitings')
    ])
};
