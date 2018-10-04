var mysql = require("mysql");
const db = require("../config/keys");

var connection = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  database: "devsocialnetwork"
});

connection.connect();

module.exports = connection;
