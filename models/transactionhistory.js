"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    static associate(models) {
      TransactionHistory.hasOne(models.Profile);
      TransactionHistory.belongsTo(models.Transaction);
    }
  }
  TransactionHistory.init(
    {
      TransactionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TransactionHistory",
    }
  );
  return TransactionHistory;
};
