const express = require("express");
const mysql = require("mysql");
const db = require("./models/dbconnection");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

db.query("CREATE DATABASE IF NOT EXISTS mydb", function(err, result) {
  if (err) throw err;
  console.log("Database created");
});

const app = express();
const port = process.env.port || 3000;

app.listen(port, () => console.log(`server running on port ${port}`));

app.get("/", (req, res) => res.send("hello"));

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
