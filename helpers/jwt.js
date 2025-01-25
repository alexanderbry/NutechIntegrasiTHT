const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;

let createToken = (payload) =>
  jwt.sign(payload, secret_key, { expiresIn: "12h" });
let verifyToken = (token) => jwt.verify(token, secret_key);

module.exports = { createToken, verifyToken };
