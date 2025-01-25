const { createToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const { User, Profile } = require("../models");
const extensionsChecker = require("../helpers/extensionsChecker");
const { handleUpload } = require("../helpers/cloudinary");

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
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "balance", "UserId"],
        },
      });

      const user = await User.findOne({
        where: { id: UserId },
        attributes: ["email"],
      });

      if (!profile) throw { name: "Not Found" };

      const data = {
        email: user.email,
        ...profile.dataValues,
      };
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

  static async updateProfileName(payload) {
    try {
      const { id, first_name, last_name } = payload;
      const UserId = id;

      await Profile.update(
        {
          first_name,
          last_name,
        },
        {
          where: { UserId: id },
        }
      );

      const profile = await Profile.findOne({
        where: { UserId: id },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "balance", "UserId"],
        },
      });

      const user = await User.findOne({
        where: { id: UserId },
        attributes: ["email"],
      });

      const data = {
        email: user.email,
        ...profile.dataValues,
      };

      return {
        status: 0,
        message: "Update Pofile berhasil",
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async updateProfileImage(payload) {
    try {
      const { id, image } = payload;
      const UserId = id;

      if (!image) throw { name: "FileRequired" };

      const isValidType = await extensionsChecker(image.originalname);
      if (!isValidType) throw { name: "InvalidType" };

      const b64 = Buffer.from(image.buffer).toString("base64");
      let imageURI = "data:" + image.mimetype + ";base64," + b64;

      const profile_image = await handleUpload(imageURI);

      await Profile.update(
        {
          profile_image,
        },
        {
          where: { UserId: id },
        }
      );

      const profile = await Profile.findOne({
        where: { UserId: id },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "balance", "UserId"],
        },
      });

      const user = await User.findOne({
        where: { id: UserId },
        attributes: ["email"],
      });

      const data = {
        email: user.email,
        ...profile.dataValues,
      };

      return {
        status: 0,
        message: "Update Profile Image berhasil",
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
