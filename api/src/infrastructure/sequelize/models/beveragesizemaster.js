'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BeverageSizeMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BeverageSizeMaster.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deleteFlg: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'BeverageSizeMaster',
    },
  );
  return BeverageSizeMaster;
};
