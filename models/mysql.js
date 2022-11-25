var config = require("../config/default");
var Sequelize = require("sequelize");

var Mysql = new Sequelize(
  config.mysql.database,
  config.mysql.user,
  config.mysql.password,
  {
    host: config.mysql.host,
    dialect: "mysql",
    port: 3306,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

module.exports = Mysql;
