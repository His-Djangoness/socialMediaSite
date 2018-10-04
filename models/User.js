const db = require("../models/dbconnection");

let createTableUser = {
  createUser: function() {
    let sql = `CREATE TABLE IF NOT EXISTS users(
      id int AUTO_INCREMENT, 
      name VARCHAR(50) NOT NULL, 
      email VARCHAR(100) NOT NULL,  
    password VARCHAR(500)NOT NULL, 
    avatar VARCHAR(500) NOT NULL, 
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID)
    )`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    });
  }
};

module.exports = createTableUser;
