const controller = require('./controller');
const {validate} = require('../../middleware/validate')
const validation = require('./validation');

module.exports = (router) => {
    router.post('/signUp', validate(validation.signUp), controller.signUp);
    router.post('/otpVerification', validate(validation.otpVerification), controller.otpVerification)
}