const db = require("../../../models/index");
const { sequelize } = require("../../../models/index");
const { apiResponse } = require("../../helper/apiResponse");
const message = require("./message");
const http = require("https");
const Sequelize = require("Sequelize");
const Op = Sequelize.Op;
const userInfo = require("../../helper/userInfo");

exports.join = async function (req, res) {
  const { roomId } = req.body;
  const transactionInstance = await sequelize.transaction();
  try {
    const user = await userInfo(req, res, transactionInstance);
    const member = await db.Member.findOrCreate({
      where: { roomId, userId: user.id },
      defaults: { roomId, userId: user.id },
      transaction: transactionInstance,
    });
    transactionInstance.commit();
    res.status(200).send(
      apiResponse(1, message.JOINED_ROOM, {
        Member: member,
      })
    );
  } catch (err) {
    transactionInstance.rollback();
    res.status(500).send(
      apiResponse(0, message.INTERNAL_ERROR, {
        error: err,
      })
    );
  }
};

exports.leave = async function(req, res){
  const { roomId } = req.params;
  const transactionInstance = await sequelize.transaction();
  try{
    const user = await userInfo(req, res, transactionInstance);
    let member = await db.Member.findOne({where: {roomId, userId: user.id}, transaction: transactionInstance});
    member = member.dataValues;
    if(member.isAdmin == 1){
      res.status(409).send(apiResponse(0, 'Invalid action', {Member: `You are the admin of this room. You cannot leave the room. But you can delete the room`}));
    }else{
      await db.Member.destroy({where: {roomId, userId: user.id}, transaction: transactionInstance});
      transactionInstance.commit();
      res.status(200).send(apiResponse(1, message.LEFT_ROOM, {Member: `You left the room ${roomId}`}));
    }
  }catch(err){
    transactionInstance.rollback();
    res.status(500).send(
      apiResponse(0, message.INTERNAL_ERROR, {
        error: err,
      })
    );
  }
}

exports.kick = async function(req, res) {
  const {roomId, memberId} = req.body;
  const transactionInstance = await sequelize.transaction();
  try{
    const user = await userInfo(req, res, transactionInstance);
    let member = await db.Member.findOne({where: {roomId, userId: user.id}, transaction: transactionInstance});
    member = member.dataValues;
    if(member.isAdmin !== 1){
      res.status(409).send(apiResponse(0, 'Invalid action', {Member: `You are the not admin of this room. You cannot kick others out of the room`}));
    }else{
      await db.Member.destroy({where: {roomId, userId: memberId}, transaction: transactionInstance});
      transactionInstance.commit();
      res.status(200).send(apiResponse(1, message.USER_REMOVED, {Member: `User removed from the room ${roomId}`}));
    }
  }catch(err){
    transactionInstance.rollback();
    res.status(500).send(
      apiResponse(0, message.INTERNAL_ERROR, {
        error: err,
      })
    );
  }
}