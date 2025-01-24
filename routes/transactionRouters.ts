import { Router } from "express";

export const transactionRouters = Router();

transactionRouters.get("/", (req, res) => {
  res.send("Transaction page");
});
