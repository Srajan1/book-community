const controller = require('./controller');
const {validate} = require('../../middleware/validate')
const validation = require('./validation');
const {authorization} = require('../../middleware/authorization')
module.exports = (router) => {
    router.post('/discussion', authorization, validate(validation.create), controller.create);
    router.get('/discussion/room/:roomId', authorization, controller.index);
    router.get('/discussion/:discussionId', authorization, controller.view);
}