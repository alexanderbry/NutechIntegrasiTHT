"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.hasMany(models.TransactionHistory);
      Transaction.belongsTo(models.Services, { foreignKey: "ServicesId" });
      Transaction.belongsTo(models.Profile, { foreignKey: "ProfileId" });
    }
  }
  Transaction.init(
    {
      invoice_number: {
        type: DataTypes.STRING,
        unique: {
          arg: true,
          msg: "Nomor invoice sudah digunakan",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter invoice_number wajib diisi",
          },
          notEmpty: {
            msg: "Parameter invoice_number wajib diisi",
          },
        },
      },
      transaction_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter transaction_type wajib diisi",
          },
          notEmpty: {
            msg: "Parameter transaction_type wajib diisi",
          },
        },
      },
      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter total_amount wajib diisi",
          },
          notEmpty: {
            msg: "Parameter total_amount wajib diisi",
          },
          min: {
            args: [0],
            msg: "Parameter total_amount minimal 0",
          },
        },
      },
      ServicesId: DataTypes.INTEGER,
      ProfileId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
