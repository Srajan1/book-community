const controller = require('./controller');
const {validate} = require('../../middleware/validate')
const validation = require('./validation');
const {authorization} = require('../../middleware/authorization')

module.exports = (router) => {
    router.post('/comment/:discussionId', authorization, validate(validation.create), controller.create);
    router.get('/comment/:discussionId', authorization, controller.index);
}