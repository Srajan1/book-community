const controller = require('./controller');
const {validate} = require('../../middleware/validate')
const validation = require('./validation');
module.exports = (router) => {
    router.post('/room', validate(validation.create), controller.create);
}