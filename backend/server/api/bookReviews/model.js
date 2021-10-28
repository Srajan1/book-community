module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    body: {
      type: DataTypes.STRING(1000),
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    hasSpoiler: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  Review.associate = models => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Review.belongsTo(models.Room, {
      foreignKey: 'roomId'
    });
  }
  return Review;
};
