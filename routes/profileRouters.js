const { Router } = require("express");

const profileRouters = Router();

profileRouters.get("/", (req, res) => {
  res.send("Profile page");
});

module.exports = profileRouters;
