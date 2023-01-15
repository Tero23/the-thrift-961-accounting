module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define("item", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Available", "Sold"]],
      },
      defaultValue: "Available",
    },
    cost: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    price: {
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

  item.associate = (models) => {
    item.hasOne(models.revenue, {
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return item;
};
