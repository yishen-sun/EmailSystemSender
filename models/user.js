var Sequelize = require("sequelize");
var Mysql = require("./mysql");

var User = Mysql.define(
  "user",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "EmailUser",
    timestamps: false,

    indexes: [
      {
        type: "UNIQUE",
        method: "BTREE",
        unique: true,
        fields: ["uuid"],
      },
    ],
    comment: "EmailUser Table",
  }
);

module.exports = User; //导出
