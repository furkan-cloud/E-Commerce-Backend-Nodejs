const Joi = require("joi");

const createProduct = Joi.object({
  name: Joi.string().required().min(2),
  description: Joi.string().min(2),
  quantity: Joi.number().positive(),
  unit_price: Joi.number().positive(),
  category: Joi.array(),
});

const updateProduct = Joi.object({
  name: Joi.string().min(2),
  description: Joi.string().min(2),
  quantity: Joi.number().positive(),
  unit_price: Joi.number().positive(),
  category: Joi.array(),
  comments: Joi.array(),
  media: Joi.string(),
});

module.exports = {
  createProduct,
  updateProduct,
};
