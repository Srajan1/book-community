const Joi = require("joi");

exports.join = Joi.object().keys({
  roomId: Joi.number().required()
});

exports.kick = Joi.object().keys({
  roomId: Joi.number().required(),
  memberId: Joi.number().required(),
});