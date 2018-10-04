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
  },
  createExperience: function() {
    let sql = `CREATE TABLE IF NOT EXISTS experience(

        profile_id INT,
      title VARCHAR(40) NOT NULL, 
      company VARCHAR(100) NOT NULL,  
    location VARCHAR(100) NULL, 
    from_when DATETIME NOT NULL,
    to_when DATETIME  NULL,
    current BOOLEAN DEFAULT false,
    description VARCHAR(500) NOT NULL, 
    foreign key (profile_id) references profile(id) on delete cascade
    
    )`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    });
  },
  createEducation: function() {
    let sql = `CREATE TABLE IF NOT EXISTS education(
    
      profile_id INT,
      school VARCHAR(40) NOT NULL, 
      degree VARCHAR(100) NOT NULL,  
    field_of_study VARCHAR(100) NULL, 
    from_when DATETIME,
    to_when DATETIME  ,
    current BOOLEAN DEFAULT false,
    description VARCHAR(500) NOT NULL, 
    foreign key (profile_id) references profile(id) on delete cascade
   
    )`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    });
  }
};

module.exports = createTableProfile;
