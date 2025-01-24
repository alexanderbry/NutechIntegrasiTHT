'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    static associate(models) {
    }
  }
  Banner.init({
    banner_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter banner_name wajib diisi",
          },
          notEmpty: {
            msg: "Parameter banner_name wajib diisi",
          },
        },
      },
    banner_image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter banner_image wajib diisi",
          },
          notEmpty: {
            msg: "Parameter banner_image wajib diisi",
          },
        },
      },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Parameter description wajib diisi",
          },
          notEmpty: {
            msg: "Parameter description wajib diisi",
          },
        },
      }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};