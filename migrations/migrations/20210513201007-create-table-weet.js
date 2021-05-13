'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { STRING: stringSequelize } = Sequelize;
    return queryInterface.createTable('weets', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      content: { type: stringSequelize(140), allowNull: false },
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
    });
  },
  down: queryInterface => queryInterface.dropTable('weets')
};
