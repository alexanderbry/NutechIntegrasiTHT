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

module.exports = { topupSchema };
