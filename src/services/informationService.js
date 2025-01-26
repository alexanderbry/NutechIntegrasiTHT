const { Banner, Services } = require("../../models");

class informationService {
  static async getAllBanner(payload) {
    try {
      const banners = await Banner.findAll();
      if (!banners || banners.length === 0) throw { name: "Not Found" };

      const bannerData = banners.map((banner) => banner.dataValues);

      return {
        status: 200,
        message: "Sukses",
        data: bannerData,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async getAllService(payload) {
    try {
      const services = await Services.findAll();
      if (!services || services.length === 0) throw { name: "Not Found" };

      const serviceData = services.map((service) => service.dataValues);

      return {
        status: 200,
        message: "Sukses",
        data: serviceData,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}

module.exports = informationService;
