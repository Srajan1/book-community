const Joi = require("joi");

exports.create = Joi.object().keys({
  isbn: Joi.string().required()
});