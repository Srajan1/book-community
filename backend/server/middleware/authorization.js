const jwt = require('jsonwebtoken');
require('dotenv').config();
const {apiResponse} = require('../helper/apiResponse')
const db = require('../../models/index')
exports.authorization = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res
			.status(401)
			.send(
				apiResponse(0, 'Unauthorized user', {
					error: 'User is not authorized',
				}),
			);
	}
	const token = authorization.replace('Bearer ', '');
	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res
				.status(401)
				.send(
					apiResponse(0, 'Unauthorized user', {
						error: err,
					}),
				);
		} else {
			const user = await db.User.findOne({ where: { email: decoded.email } });
			if (user && user.dataValues.isVerified === 1) {
				next();
			} else {
				res
					.status(400)
					.send(apiResponse(400, 'Unauthorized user', {error: 'User is not authorized',}));
			}
		}
	});
};
