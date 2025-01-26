const { Router } = require("express");
const transactionController = require("../controllers/transactionController");

const transactionRouters = Router();

transactionRouters.post("/", transactionController.payment);
transactionRouters.get("/history", transactionController.getTransactionHistory);

module.exports = transactionRouters;
