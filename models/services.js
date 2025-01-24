"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    static associate(models) {
      Services.hasMany(models.Transaction);
    }
  }
  Services.init(
    {
      service_code: {
        type: DataTypes.STRING,
        unique: {
          arg: true,
          msg: "Nama service sudah digunakan",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter service_code wajib diisi",
          },
          notEmpty: {
            msg: "Parameter service_code wajib diisi",
          },
        },
      },
      service_name: {
        type: DataTypes.STRING,
        unique: {
          arg: true,
          msg: "Nama service sudah digunakan",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter service_name wajib diisi",
          },
          notEmpty: {
            msg: "Parameter service_name wajib diisi",
          },
        },
      },
      service_icon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter service_icon wajib diisi",
          },
          notEmpty: {
            msg: "Parameter service_icon wajib diisi",
          },
        },
      },
      service_tariff: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter service_tariff wajib diisi",
          },
          notEmpty: {
            msg: "Parameter service_tariff wajib diisi",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Services",
    }
  );
  return Services;
};
