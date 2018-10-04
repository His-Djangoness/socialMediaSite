const db = require("../models/dbconnection");

var Task = {
  createDatabase: function() {
    db.query(
      "CREATE DATABASE IF NOT EXISTS devsocialnetwork",
      (err, result) => {
        if (err) throw err;
      }
    );
  }
};
module.exports = Task;
