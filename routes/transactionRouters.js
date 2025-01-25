const { Router } = require("express");

const transactionRouters = Router();

transactionRouters.get("/", (req, res) => {
  res.send("Transaction page");
});

module.exports = transactionRouters;
