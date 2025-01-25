const membershipService = require("../services/membershipService");
const { registerSchema, loginSchema } = require("../schemas/membershipSchema");

class membershipController {
  static async register(req, res, next) {
    try {
      const { error, value } = registerSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          status: 102,
          message: error.message,
          data: null,
        });
      }

      const payload = {
        email: value.email,
        password: value.password,
        first_name: value.first_name,
        last_name: value.last_name,
      };

      const newUser = await membershipService.register(payload);

      if (newUser.error) throw newUser.error;

      res.status(201).json({
        status: newUser.status,
        message: newUser.message,
        data: newUser.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          status: 102,
          message: error.message,
          data: null,
        });
      }

      const payload = { email: value.email, password: value.password };

      const loggedIn = await membershipService.login(payload);
      if (loggedIn.error) throw loggedIn.error;
      res.status(200).json({
        status: loggedIn.status,
        message: loggedIn.message,
        data: loggedIn.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const { id } = req.user;
      const payload = id;

      const loggedIn = await membershipService.getProfile(payload);
      if (loggedIn.error) throw loggedIn.error;
      
      res.status(200).json({
        status: loggedIn.status,
        message: loggedIn.message,
        data: loggedIn.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = membershipController;
