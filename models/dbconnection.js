var mysql = require("mysql");
const db = require("../config/keys");

var connection = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password
});

connection.connect();

module.exports = connection;
