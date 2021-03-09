'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BeveragePrices', {
      beverageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sizeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deleteFlg: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BeveragePrices');
  },
};
