const Joi = require("joi");

exports.create = Joi.object().keys({
    body: Joi.string().required()
}).required()