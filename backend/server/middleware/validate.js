const {apiResponse} = require('../helper/apiResponse')
exports.validate = (schema) => (req, res, next) => {
	const {error} = schema.validate(req.body);
	if(error){
		res.status(422).send(apiResponse(0, 'Invalid data sent', error.details[0].message))
	}else{
		next();
	}
};
