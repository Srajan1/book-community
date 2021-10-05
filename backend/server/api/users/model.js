module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
      type: DataTypes.STRING,
      defaultValue: "1"
    },
    isVerified: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },{timestamps: false}
  );
  return User;
};
