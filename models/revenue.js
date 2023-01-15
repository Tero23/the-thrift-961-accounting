module.exports = (sequelize, DataTypes) => {
  const revenue = sequelize.define("revenue", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    itemId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "items",
        key: "id",
      },
      onDelete: "CASCADE",
      hooks: true,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  revenue.associate = (models) => {
    revenue.belongsTo(models.item);
  };

  return revenue;
};
