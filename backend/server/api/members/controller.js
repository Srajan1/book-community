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
  try {
    const transactionInstance = await sequelize.transaction();
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
        error: err.errors[0].message,
      })
    );
  }
};
