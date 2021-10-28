const Joi = require('joi');

exports.create = Joi.object().keys({
    roomId: Joi.number().required(),
    body: Joi.string().required(),
    rating: Joi.number().integer().required().min(1).max(5),
    hasSpoiler: Joi.number().integer().required().min(0).max(1)
});