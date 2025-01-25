const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Paramter email tidak sesuai format",
    "any.required": "Email tidak boleh kosong",
  }),
  first_name: Joi.string().required().messages({
    "any.required": "Parameter first_name tidak boleh kosong",
  }),
  last_name: Joi.string().required().messages({
    "any.required": "Parameter last_name tidak boleh kosong",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password tidak boleh kosong",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Paramter email tidak sesuai format",
    "any.required": "Email tidak boleh kosong",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password tidak boleh kosong",
  }),
});

module.exports = { registerSchema, loginSchema };
