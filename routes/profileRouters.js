const { Router } = require("express");
const membershipController = require("../controllers/membershipController");

const profileRouters = Router();

profileRouters.get("/", membershipController.getProfile);

module.exports = profileRouters;
