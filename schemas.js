const Joi = require("joi");

module.exports.coffeeshopSchema = Joi.object({
  cafe: Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    avgprice: Joi.number().required().min(0).max(100),
    description: Joi.string().required(),
    location: Joi.string().required(),
  }).required(),
});
