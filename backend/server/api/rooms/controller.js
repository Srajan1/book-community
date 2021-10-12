const db = require("../../../models/index");
const {sequelize} = require("../../../models/index");
const { apiResponse } = require("../../helper/apiResponse");
const message = require("./message");
const http = require("https");
const userInfo = require("../../helper/userInfo");

exports.create = async function (req, res) {
  const { isbn } = req.body;
  http
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", async () => {
          const bookData = JSON.parse(data);
          if (bookData.totalItems === 0) {
            res
              .status(404)
              .send(
                apiResponse(0, message.BOOK_NOT_FOUND, {
                  error: "No books match that ISBN number",
                })
              );
          } else {
            const transactionInstance = await sequelize.transaction();
            const book = bookData.items[0];
            const user = await userInfo(req, res, transactionInstance);
            try {
              const { title } = book.volumeInfo;
              const { subtitle } = book.volumeInfo;
              const { description } = book.volumeInfo;
              const { thumbnail } = book.volumeInfo.imageLinks;

              const newBook = await db.Book.create({
                title,
                isbn,
                subtitle,
                description,
                thumbnail,
              },
              { transaction: transactionInstance }
              );
              const bookId = newBook.dataValues.id;
              const userId = user.id;
              const Room = await db.Room.create({bookId, adminId: userId}, { transaction: transactionInstance });
              transactionInstance.commit();
              res.status(200)
              .send(apiResponse(1, message.ROOM_CREATED, {Room}));
            } catch (err) {
              transactionInstance.rollback();
              res
                .status(500)
                .send(
                  apiResponse(0, message.INTERNAL_ERROR, { error: err.errors[0].message })
                );
            }
          }
        });
      }
    )
    .on("error", (err) => {
      res
        .status(500)
        .send(apiResponse(0, message.INTERNAL_ERROR, { error: err.message }));
    });
};
