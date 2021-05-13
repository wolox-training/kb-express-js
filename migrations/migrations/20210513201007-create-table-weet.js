'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('weets', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      content: { type: Sequelize.TEXT, allowNull: false },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    }),

  down: queryInterface => queryInterface.dropTable('weets')
};
