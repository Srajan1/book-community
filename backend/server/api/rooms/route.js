const controller = require('./controller');
const {validate} = require('../../middleware/validate')
const validation = require('./validation');
const {authorization} = require('../../middleware/authorization')
module.exports = (router) => {
    router.post('/room', authorization, validate(validation.create), controller.create);
    router.get('/room', authorization, controller.index);
}