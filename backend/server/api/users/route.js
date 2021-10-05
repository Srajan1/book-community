const controller = require('./controller');
const {validate} = require('../../middleware/validate')
const validation = require('./validation');
const {authorization} = require('../../middleware/authorization')
module.exports = (router) => {
    router.post('/signUp', validate(validation.signUp), controller.signUp);
    router.post('/otpVerification', validate(validation.otpVerification), controller.otpVerification);
    router.post('/signIn', validate(validation.signIn), controller.signIn);
}