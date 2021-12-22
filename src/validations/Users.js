const Joi = require("joi");

const createUser = Joi.object({
  first_name: Joi.string().required().min(2),
  last_name: Joi.string().required().min(2),
  email: Joi.string().email().required().min(8),
  password: Joi.string().required().min(8),
});

const updateUser = Joi.object({
  first_name: Joi.string().min(2),
  last_name: Joi.string().min(2),
  email: Joi.string().email().min(8),
  password: Joi.string().min(8),
  addresses: Joi.array(),
  phones: Joi.array(),
  favorites: Joi.array(),
});

module.exports = {
  createUser,
  updateUser,
};
