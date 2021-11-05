const Joi = require("joi");

exports.create = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    roomId: Joi.number().required()
}).required()