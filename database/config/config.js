const Sequelize = require("sequelize");
require("dotenv").config();
const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql"
});
