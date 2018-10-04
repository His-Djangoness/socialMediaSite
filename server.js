const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const passport = require("passport");
const Task = require("./models/CreateDatabase");
const createUserTable = require("./models/User");
const createProfileTable = require("./models/Profile");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

Task.createDatabase();
createUserTable.createUser();
createProfileTable.createProfile();

const app = express();
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.port || 3000;

app.listen(port, () => console.log(`server running on port ${port}`));

//passport middleware
app.use(passport.initialize());
//passport config
require("./config/passport.js")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
