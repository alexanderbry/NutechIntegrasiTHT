const Joi = require("joi");

const topupSchema = Joi.object({
  top_up_amount: Joi.number().min(0).required().messages({
    "any.required": "Parameter amount tidak boleh kosong",
    "number.base":
      "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
    "number.min":
      "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
  }),
});

const paymentSchema = Joi.object({
  service_code: Joi.string()
  .required()
  .messages({
      "any.required": "Parameter service_code tidak boleh kosong",
      "string.base": "Parameter service_code hanya boleh berupa string",
    }),
});

const getTransactionHistorySchema = Joi.object({
  offset: Joi.number().min(0).required().messages({
    "any.required": "Query tidak boleh kosong",
    "number.base":
      "Query hanya boleh angka dan tidak boleh lebih kecil dari 0",
    "number.min":
      "Query hanya boleh angka dan tidak boleh lebih kecil dari 0",
  }),
  limit: Joi.number().min(0).required().messages({
    "any.required": "Query tidak boleh kosong",
    "number.base":
      "Query hanya boleh angka dan tidak boleh lebih kecil dari 0",
    "number.min":
      "Query hanya boleh angka dan tidak boleh lebih kecil dari 0",
  }),
});

module.exports = { topupSchema, paymentSchema, getTransactionHistorySchema };
