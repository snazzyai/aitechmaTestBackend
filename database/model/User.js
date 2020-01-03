const Sequelize = require("sequelize");
const db = require("../config/config");

const User = db.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    pin: {
      type: Sequelize.STRING
    }
  },
  {}
);

module.exports = User;
