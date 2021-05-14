module.exports = (sequelize, DataTypes) => {
  const { STRING: stringSequelize } = DataTypes;
  const Weet = sequelize.define(
    'Weet',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      content: { type: stringSequelize(140), allowNull: false },
      userId: { allowNull: false, type: DataTypes.INTEGER, field: 'user_id' },
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    {
      tableName: 'weets'
    }
  );

  Weet.associate = models => {
    Weet.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Weet;
};
