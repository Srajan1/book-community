const db = require("../../models/index");
const { apiResponse } = require("../helper/apiResponse");
const message = require("../../server/api/users/message.json");
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async (req, res, transactionInstance) => {
    const { authorization } = req.headers;
    if(!authorization){
        res
        .status(401)
        .send(util.apiResponse(0, message.UNVERIFIED_USER, {error: err }));
    }
    const token = authorization.replace('Bearer ', '');
    let user;
    user = await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

        if(err){
            res
            .status(401)
            .send(util.apiResponse(0, message.UNVERIFIED_USER, {error: err }));
        }else{
            user = await db.User.findOne({where: {email: decoded.email},transaction: transactionInstance});
            return user.dataValues;
        }
    });
    return user;
}