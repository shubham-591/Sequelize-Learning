const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const car = require('./cars')
const user = require('./users')
const tag = require('./tag.js')
const db = {};


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelExports = [
    car,
    user,
    tag,
 ] ;
modelExports.forEach(modelExports => {
    const model = modelExports(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associations should be defined here after the models are initialized
// db.users.hasOne(db.Cars, { foreignKey: 'userId', as: 'car' });
// db.Cars.belongsTo(db.users, { foreignKey: 'userId', as: 'user' });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
