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
        error: err,
      })
    );
  }
};

exports.view = async function (req, res) {
  const roomId = req.params.roomId;
  try {
    const Review = await db.Review.findAll({ where: { roomId }, include: [{model: db.User, attributes: ['name']}] });
    res.status(200).send(
      apiResponse(1, message.REVIEW_FETCHED, {
        Review,
      })
    );
  } catch (err) {
    res.status(500).send(
      apiResponse(0, message.INTERNAL_ERROR, {
        error: err,
      })
    );
  }
};

exports.update = async function (req, res) {
  const reviewId = req.params.reviewId;
  try {
    const transactionInstance = await sequelize.transaction();
    const user = await userInfo(req, res, transactionInstance);
    const data = req.body;
    let Review = await db.Review.findOne({
      where: { id: reviewId },
      transaction: transactionInstance,
    });
    if (!Review) {
      res.status(404).send(apiResponse(0, message.REVIEW_NOT_FOUND, {}));
    }
    Review = Review.dataValues;
    if (user.id != Review.userId) {
      res.status(422).send(apiResponse(0, message.INVALID_UPDATION, {}));
    } else {
      await db.Review.update(data, {
        where: { id: reviewId },
        returning: true,
        transaction: transactionInstance,
      });
      const updateReview = await db.Review.findOne({
        where: { id: reviewId },
        transaction: transactionInstance,
      });
      transactionInstance.commit();
      res.status(200).send(
        apiResponse(1, message.REVIEW_UPDATED, {
          updateReview,
        })
      );
    }
  } catch (err) {
    transactionInstance.rollback();
    res.status(500).send(
      apiResponse(0, message.INTERNAL_ERROR, {
        error: err,
      })
    );
  }
};

exports.delete = async function (req, res) {
  const reviewId = req.params.reviewId;
  try {
    const transactionInstance = await sequelize.transaction();
    const user = await userInfo(req, res, transactionInstance);
    let Review = await db.Review.findOne({
      where: { id: reviewId },
      transaction: transactionInstance,
    });
    if (!Review) {
      res.status(404).send(apiResponse(0, message.REVIEW_NOT_FOUND, {}));
    }
    Review = Review.dataValues;
    if (user.id != Review.userId) {
      res.status(422).send(apiResponse(0, message.INVALID_DELETION, {}));
    } else {
      await db.Review.destroy({
        where: { id: reviewId },
        transaction: transactionInstance,
      });
      transactionInstance.commit();
      res.status(200).send(apiResponse(1, message.REVIEW_DELETED, {}));
    }
  } catch (err) {
    transactionInstance.rollback();
    res.status(500).send(
      apiResponse(0, message.INTERNAL_ERROR, {
        error: err,
      })
    );
  }
};
