const { Router } = require("express");
const membershipController = require("../controllers/membershipController");
const uploadMiddleware = require("../middleware/multer");

const profileRouters = Router();

profileRouters.get("/", membershipController.getProfile);
profileRouters.put("/update", membershipController.updateProfileName);
profileRouters.put("/image", uploadMiddleware, membershipController.updateProfileImage);

module.exports = profileRouters;
