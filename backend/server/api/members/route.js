const controller = require('./controller');
const {validate} = require('../../middleware/validate')
const validation = require('./validation');
const {authorization} = require('../../middleware/authorization')
module.exports = (router) => {
    router.post('/member', authorization, validate(validation.join), controller.join);
    router.delete('/member/:roomId', authorization, controller.leave);
}