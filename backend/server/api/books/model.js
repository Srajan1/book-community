module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING
      },
      isbn: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
      },
      subtitle: {
          type: DataTypes.STRING,
      },
      description:{
        type: DataTypes.STRING(10000),
      },
      thumbnail:{
        type: DataTypes.STRING(500),
      }
    },{timestamps: false}
    );
    return Book;
  };
  