const db = require("../../../models/index");
const { sequelize } = require("../../../models/index");
const { apiResponse } = require("../../helper/apiResponse");
const message = require("./message");
const Sequelize = require("Sequelize");
const Op = Sequelize.Op;
const userInfo = require("../../helper/userInfo");

exports.create = async function (req, res) {
  try {
    const transactionInstance = await sequelize.transaction();
    const user = await userInfo(req, res, transactionInstance);
    const data = req.body;
    data.userId = user.id;
    const Review = await db.Review.create(data, {
      transaction: transactionInstance,
    });
    transactionInstance.commit();
    res.status(200).send(
      apiResponse(1, message.REVIEW_ADDED, {
        Review,
      })
    );
  } catch (err) {
    transactionInstance.rollback();
    res.status(500).send(
      apiResponse(0, message.INTERNAL_ERROR, {
        error: err.message,
      })
    );
  }
};
