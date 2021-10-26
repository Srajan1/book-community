const Joi = require("joi");

exports.join = Joi.object().keys({
  roomId: Joi.number().required()
});