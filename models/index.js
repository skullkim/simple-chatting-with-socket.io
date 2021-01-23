const Sequelize = require('sequelize');

const env = process.env.NODE_DEV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.databse, config.username, config.password, config
);

db.sequelize = sequelize;

module.exports = db;