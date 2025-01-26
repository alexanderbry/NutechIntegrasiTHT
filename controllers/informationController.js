const informationService = require("../services/informationService");

class informationController {
  static async getAllBanner(req, res, next) {
    try {
      const data = await informationService.getAllBanner();

      if (data.error) throw data.error;

      res.status(200).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllService(req, res, next) {
    try {
      const data = await informationService.getAllService();

      if (data.error) throw data.error;

      res.status(200).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = informationController;
