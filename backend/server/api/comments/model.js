module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      body: {
        type: DataTypes.STRING(10000),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      discussionId: {
        type: DataTypes.INTEGER,
      },
    });
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Comment.belongsTo(models.Discussion, {
        foreignKey: "discussionId",
      });
    };
    return Comment;
  };
  