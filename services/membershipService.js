const { createToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const User = require("../models").User;

class membershipService {
  static async register(payload) {
    try {
      const { email, first_name, last_name, password } = payload;
      
      const response = await User.create({
        email,
        first_name,
        last_name,
        password,
      });
  
      return {
        status: 0,
        message: "Registrasi berhasil silahkan login",
        data: null,
      };
    } catch (error) {
      return {
        error
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
      console.log(access_token, "ini token di service");
      

      return {
        status: 0,
        message: "Login Sukses",
        data: { token: access_token },
      };
    } catch (error) {
      return {
        error
      };
    }
  }

  static async getProfile(payload) {
    try {
      const { id } = payload;

      const user = await User.findByPk(id);
      if (!user) throw { name: "Not Found" };

      return {
        status: 0,
        message: "Login Sukses",
        data: { token: access_token },
      };
    } catch (error) {
      // next(error);
    }
  }
}

module.exports = membershipService;
