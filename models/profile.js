"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.hasMany(models.Transaction);
      Profile.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter first_name wajib diisi",
          },
          notEmpty: {
            msg: "Parameter first_name wajib diisi",
          },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter last_name wajib diisi",
          },
          notEmpty: {
            msg: "Parameter last_name wajib diisi",
          },
        },
      },
      profile_image: {
        type: DataTypes.STRING,
        defaultValue: "../assets/profile_image.jpg",
      },
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
