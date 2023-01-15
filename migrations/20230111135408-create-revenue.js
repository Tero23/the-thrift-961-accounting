"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("revenues", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      itemId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "items",
          key: "id",
        },
        onDelete: "CASCADE",
        hooks: true,
      },
      amount: {
        type: Sequelize.BIGINT,
        allownull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("revenues");
  },
};
