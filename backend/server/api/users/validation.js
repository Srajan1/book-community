const Joi = require("joi");

exports.signUp = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
exports.otpVerification = Joi.object().keys({
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
});
exports.signIn = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
