const pkg = require('sequelize');
const jsonConfig = require("../config/config.json")['development'];
const config = {
    "username": jsonConfig.username,
    "password": jsonConfig.password,
    "database": jsonConfig.database,
    "host": '127.0.0.1',
    "dialect": "mysql"
};
const { Sequelize } = pkg;
let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
module.exports = sequelize;
