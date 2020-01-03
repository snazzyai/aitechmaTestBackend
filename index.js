const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/config/config");
const cors = require("cors");

require("dotenv").config();
console.log("dbname", typeof process.env.DB_NAME);
const { PORT } = process.env;

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());

app.use("/api", require("./Routes/users"));

//test db connection
db.authenticate()
  .then(() =>
    console.log("database connection has been established successfully")
  )
  .catch(err => console.log("unable to connect to database", err));

app.listen(PORT || 3000, () => {
  console.log(`listening to port ${PORT}..`);
});
