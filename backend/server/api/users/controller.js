const db = require('../../../models/index');
const {apiResponse} = require('../../helper/apiResponse');
const message = require('./message');

exports.signUp = async function (req, res) {
    const data = req.body;
    try{
        
    }catch(err){
        console.log(err);
        res.status(500).send(apiResponse(0, message.INTERNAL_ERROR, {error: err}))
    }
}