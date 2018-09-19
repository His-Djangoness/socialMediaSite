const db = require("./models/dbconnection");

var createDatabase = db.query("CREATE DATABASE IF NOT EXISTS mydb", function(
  err,
  result
) {
  if (err) throw err;
  console.log("Database created");
});

module.exports = createDatabase;
