const Joi = require("joi");

module.exports.coffeeshopSchema = Joi.object({
  cafe: Joi.object({
    title: Joi.string().required(),
    avgprice: Joi.number().required().min(0).max(100),
  }).required(),
  image: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
});
