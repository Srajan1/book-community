'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname + '/../server/api').forEach(function(folder){
      fs.readdirSync(__dirname + '/../server/api/' + folder)
      .filter(file => {
        return (file === 'model.js');
      })
      .forEach(file => {
        const model = require(path.join(__dirname + '/../server/api/' + folder + '/', file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      })
  })
  


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
