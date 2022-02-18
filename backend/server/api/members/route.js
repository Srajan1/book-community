const controller = require('./controller');
const {validate} = require('../../middleware/validate')
const validation = require('./validation');
const {authorization} = require('../../middleware/authorization')
module.exports = (router) => {
    router.get('/member', authorization, controller.myRooms);
    router.post('/member', authorization, validate(validation.join), controller.join);
    router.delete('/member/kick', authorization, validate(validation.kick), controller.kick);
    router.delete('/member/:roomId', authorization, controller.leave);
}