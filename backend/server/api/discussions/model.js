module.exports = (sequelize, DataTypes) => {
  const Discussion = sequelize.define("Discussion", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    roomId: {
      type: DataTypes.INTEGER,
    },
  });
  Discussion.associate = (models) => {
    Discussion.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Discussion.belongsTo(models.Room, {
      foreignKey: "roomId",
    });
    Discussion.hasMany(models.Comment, {
      foreignKey: 'discussionId'
    });
  };
  return Discussion;
};
