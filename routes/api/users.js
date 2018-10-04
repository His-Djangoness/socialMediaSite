const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");
//load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// const userTable = require("../../models/User");
const db = require("../../models/dbconnection");
const keys = require("../../config/keys");
// GET api/users/test
// test users route
// access public

router.get("/test", (req, res) => {
  res.json({ message: "users works" });
});

// GET api/users/register
// register user
// access public

router.post("/register", (req, res) => {
  //req.body includes everything thats sent to this route including name, email

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const sql = `SELECT count(*) as count FROM users WHERE email ='${email}'`;
  db.query(sql, (err, result) => {
    if (err) res.json(err);

    if (result[0].count > 0) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", // rating
        d: "mm" //default
      });
      let newUser = {
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      };

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          var query = db.query(
            "INSERT INTO users SET ?",
            newUser,
            (err, result, fields) => {
              if (err) throw err;
              res.json({
                name: newUser.name,
                email: newUser.email,
                avatar: newUser.avatar
              });
            }
          );
        });
      });
    }
  });
});

// GET api/users/login
// login user/ return jwt
// access public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const mail = req.body.email;
  const password = req.body.password;

  //find user by email
  let sql = `SELECT id, name, avatar, email, password FROM users WHERE email ='${mail}'`;
  db.query(sql, (err, result) => {
    if (err) res.json(err);
    // check if user exists

    if (result.length === 0) {
      errors.email = "user not found";
      return res.status(404).json(errors);
    } else {
      //check password
      bcrypt.compare(password, result[0].password).then(isMatch => {
        if (isMatch) {
          //user matched
          const payload = {
            id: result[0].id,
            name: result[0].name,
            avatar: result[0].avatar
          };
          //sign the token

          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 3600
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "password incorrect";
          return res.status(400).json(errors);
        }
      });
    }
  });
});

// GET api/users/current
// return current user
// access private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      password: req.user.password,
      date: req.user.date
    });
  }
);

module.exports = router;
