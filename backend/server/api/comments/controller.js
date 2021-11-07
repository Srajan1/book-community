const db = require("../../../models/index");
const { sequelize } = require("../../../models/index");
const { apiResponse } = require("../../helper/apiResponse");
const message = require("./message");
const http = require("https");
const Sequelize = require("Sequelize");
const Op = Sequelize.Op;
const userInfo = require("../../helper/userInfo");

exports.create = async function (req, res) {
  const { discussionId } = req.params;
  const { body } = req.body;
  const transactionInstance = await sequelize.transaction();
  try {
    const user = await userInfo(req, res, transactionInstance);
    const data = {
      body,
      userId: user.id,
      discussionId,
    };
    const Comment = await db.Comment.create(data, {
      transaction: transactionInstance,
    });
    transactionInstance.commit();
    res.status(200).send(apiResponse(1, message.COMMENT_ADDED, { Comment }));
  } catch (err) {
    transactionInstance.rollback();
    res.status(500).send(
      apiResponse(0, message.INTERNAL_ERROR, {
        error: err,
      })
    );
  }
};
