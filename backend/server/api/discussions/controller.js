const db = require("../../../models/index");
const { sequelize } = require("../../../models/index");
const { apiResponse } = require("../../helper/apiResponse");
const message = require("./message");
const http = require("https");
const Sequelize = require("Sequelize");
const Op = Sequelize.Op;
const userInfo = require("../../helper/userInfo");

exports.create = async function (req, res) {
  const data = req.body;
  const transactionInstance = await sequelize.transaction();
  try {
    const user = await userInfo(req, res, transactionInstance);
    data.userId = user.id;
    const Discussion = await db.Discussion.create(data, {
      transaction: transactionInstance,
    });
    transactionInstance.commit();
    res
      .status(200)
      .send(apiResponse(1, message.DISCUSSION_ADDED, { Discussion }));
  } catch (err) {
    transactionInstance.rollback();
    res.status(500).send(
      apiResponse(0, message.INTERNAL_ERROR, {
        error: err,
      })
    );
  }
};

exports.index = async function(req, res){
    const {title, body} = req.query;
    const {roomId} = req.params;
    try{
        const where = {};
        where.roomId = roomId;
        if(title)
        where.title = { [Op.like]: "%" + title + "%" };
        if(body)
        where.body = { [Op.like]: "%" + body + "%" };
        const Discussion = await db.Discussion.findAll({where, include: [{model: db.User, attributes: ['name']}] });
        res
        .status(200)
        .send(apiResponse(1, message.DISCUSSION_FETCHED, { Discussion }));
    }catch(err){
        res.status(500).send(
            apiResponse(0, message.INTERNAL_ERROR, {
              error: err,
            })
          );
    }
}

exports.view = async function(req, res){

  const {discussionId} = req.params;
  try{
    const Discussion = await db.Discussion.findOne({where: {id: discussionId}, include: [{model: db.User, attributes: ['name']}, {model: db.Comment}]});
    
    res
        .status(200)
        .send(apiResponse(1, message.DISCUSSION_FETCHED, { Discussion }));
  }catch(err){
    console.log(err);
    res.status(500).send(
      apiResponse(0, message.INTERNAL_ERROR, {
        error: err,
      })
    );
  }
}