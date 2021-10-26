module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
      },
      adminId: {
        type: DataTypes.INTEGER
      }
    },{timestamps: false}
    );
    Room.associate = models => {
        Room.belongsTo(models.User, {
          foreignKey: 'adminId'
        });
        Room.belongsTo(models.Book, {
          foreignKey: 'bookId'
        });
      }
    return Room;
  };
  