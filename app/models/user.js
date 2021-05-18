const { roles, positions } = require('../../config/constants');

module.exports = (sequelize, DataTypes) => {
  const { ENUM: enumSequelize } = DataTypes;
  const positionValues = Object.values(positions);

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
      position: {
        type: enumSequelize(positionValues.map(position => position.label)),
        defaultValue: positions.DEVELOPER.label
      },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    {
      tableName: 'users'
    }
  );

  User.associate = models => {
    User.hasMany(models.Weet, { foreignKey: 'userId' });
    User.hasMany(models.Raiting, { foreignKey: 'raitingUserId' });
  };

  User.prototype.getPosition = score =>
    positionValues.find(
      (position, index, array) => index === array.length - 1 || score < positionValues[index + 1].min
    ).label;
  return User;
};
