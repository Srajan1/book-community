module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define("Member", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          roomId: {
            type: DataTypes.INTEGER,
          },
          userId: {
            type: DataTypes.INTEGER
          },
          isAdmin: {
              type: DataTypes.INTEGER,
              defaultValue: 0
          }
    },{timestamps: false}
    );
    Member.associate = models => {
        Member.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        Member.belongsTo(models.Room, {
          foreignKey: 'roomId'
        });
      }
    return Member;
  };
  