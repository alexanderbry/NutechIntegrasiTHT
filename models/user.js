"use strict";

const { hashPassword } = require("../src/helpers/bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          arg: true,
          msg: "Email sudah digunakan",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter email wajib diisi",
          },
          notEmpty: {
            msg: "Parameter email wajib diisi",
          },
          isEmail: {
            msg: "Parameter email tidak sesuai format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter password wajib diisi",
          },
          notEmpty: {
            msg: "Parameter password wajib diisi",
          },
          len: {
            args: [8, 20],
            msg: "Password minimal 8 karakter dan maksimal 20 karakter",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
