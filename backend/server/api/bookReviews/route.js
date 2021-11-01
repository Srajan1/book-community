const controller = require('./controller');
const {validate} = require('../../middleware/validate')
const validation = require('./validation');
const {authorization} = require('../../middleware/authorization')
module.exports = (router) => {
    router.post('/review', authorization, validate(validation.create), controller.create);
    router.get('/review/:roomId', authorization, controller.view);
    router.put('/review/:reviewId', authorization, validate(validation.update), controller.update);
    router.delete('/review/:reviewId', authorization, controller.delete);
}