const db = require("../models/dbconnection");

let createTableProfile = {
  createProfile: function() {
    let sql = `CREATE TABLE IF NOT EXISTS profile(
      id int AUTO_INCREMENT, 
      user_id INT,
      handle VARCHAR(40) NOT NULL, 
      company VARCHAR(100) NULL,  
    website VARCHAR(100) NULL, 
    location VARCHAR(100) NULL, 
    status VARCHAR(100) NOT NULL, 
    bio VARCHAR(500)  NULL, 
    github VARCHAR(300) NULL, 
    facebook VARCHAR(300) NULL, 
    youtube VARCHAR(300) NULL, 
    linkedIn VARCHAR(300) NULL, 
    instagram VARCHAR(100) NULL, 
    twitter VARCHAR(100) NULL, 
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign KEY (user_id) references users(id) on delete cascade,
    PRIMARY KEY (ID)
    )`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    });
  }
};

module.exports = createTableProfile;
