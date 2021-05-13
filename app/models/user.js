const { roles } = require('../../config/constants');

module.exports = (sequelize, DataTypes) => {
  const { ENUM: enumSequelize } = DataTypes;

  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false, field: 'last_name' },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: enumSequelize(Object.values(roles)), defaultValue: roles.REGULAR },
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    {
      tableName: 'users'
    }
  );
  return User;
};
