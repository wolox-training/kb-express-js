module.exports = (sequelize, DataTypes) => {
  const Raiting = sequelize.define(
    'Raiting',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      raitingUserId: { allowNull: false, type: DataTypes.INTEGER, field: 'raiting_user_id' },
      weetId: { type: DataTypes.INTEGER, allowNull: false, field: 'weet_id' },
      score: { type: DataTypes.INTEGER, allowNull: false, values: [-1, 1] },
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    {
      tableName: 'raitings'
    }
  );

  Raiting.associate = models => {
    Raiting.belongsTo(models.User, { foreignKey: 'raitingUserId' });
    Raiting.belongsTo(models.Weet, { foreignKey: 'weetId' });
  };
  return Raiting;
};
