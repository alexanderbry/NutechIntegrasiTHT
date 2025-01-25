const { createToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const { User, Profile } = require("../models");
const { log } = require("console");

class membershipService {
  static async register(payload) {
    try {
      const { email, first_name, last_name, password } = payload;

      const newUser = await User.create({
        email,
        password,
      });

      await Profile.create({
        first_name,
        last_name,
        UserId: newUser.id,
      });

      return {
        status: 0,
        message: "Registrasi berhasil silahkan login",
        data: null,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async login(payload) {
    try {
      const { email, password } = payload;

      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

      const isValidUser = await User.findOne({ where: { email } });
      if (!isValidUser) throw { name: "InvalidEmail/Password" };

      const isValidPassword = comparePassword(password, isValidUser.password);
      if (!isValidPassword) throw { name: "InvalidEmail/Password" };

      const jwtPayload = {
        id: isValidUser.id,
      };

      const access_token = createToken(jwtPayload);

      return {
        status: 0,
        message: "Login Sukses",
        data: { token: access_token },
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async getProfile(payload) {
    try {
      const UserId = payload;

      const profile = await Profile.findOne({
        where: { UserId },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'balance', 'UserId'] },
      });

      const user = await User.findOne({
        where: { id: UserId },
        attributes: ['email']
      });
      
      if (!profile) throw { name: "Not Found" };

      const data = {
        email: user.email,
        ...profile.dataValues
      }
      return {
        status: 0,
        message: "Sukses",
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}

module.exports = membershipService;
