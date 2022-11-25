var mysql = require("./mysql");

var userTable = require("./user");

mysql
  .sync({
    force: true,
  })
  .then(() => {
    console.log("User table created/existed");
  });

module.exports = userTable;
