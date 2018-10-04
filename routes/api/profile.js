const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../../models/dbconnection");
//load validation
const ValidateProfileInput = require("../../validation/profile");
// GET api/profile/test
// test profile route
// access public

router.get("/test", (req, res) => {
  res.json({ message: "profile works" });
});
// GET api/profile
// get current users profile
// access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    let user_id = req.user.id;
    const sql = `SELECT * FROM profile WHERE user_id ='${user_id}'`;
    db.query(sql, (err, result) => {
      if (err) console.log(err);
      if (Object.keys(result).length === 0) {
        errors.noProfile = "No profile for this User";
        res.status(404).json(errors);
      } else {
        const user = {
          id: req.user.id,
          name: req.user.name,
          avatar: req.user.avatar
        };
        // res.json(user);
        res.json({
          user: user,
          result: result
        });
      }
    });
  }
);

// GET api/profile/all
// get all profiles
// access public

router.get("/all", (req, res) => {
  const errors = {};
  const sql = `SELECT * FROM profile`;
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    if (Object.keys(result).length === 0) {
      errors.noProfiles = "No profiles at the moment";
      res.status(404).json(errors);
    } else {
      // res.json(user);
      res.json(result);
    }
  });
});

// GET api/profile/handle/:handle
// get profile by handle
// access public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  const sql = `SELECT * FROM profile WHERE handle ='${req.params.handle}'`;
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    if (Object.keys(result).length === 0) {
      errors.noProfile = "No profile for this User";
      res.status(404).json(errors);
    } else {
      // res.json(user);
      res.json(result);
    }
  });
});

// GET api/profile/user/:user_id
// get profile by user ID
// access public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  const sql = `SELECT * FROM profile WHERE user_id ='${req.params.user_id}'`;
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    if (Object.keys(result).length === 0) {
      errors.noProfile = "No profile for this User";
      res.status(404).json(errors);
    } else {
      // res.json(user);
      res.json({
        result: result
      });
    }
  });
});

// POST api/profile
// CREATE current users profile
// access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateProfileInput(req.body);

    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user_id = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.github) profileFields.github = req.body.github;
    if (req.body.facebook) profileFields.facebook = req.body.facebook;
    if (req.body.youtube) profileFields.youtube = req.body.youtube;
    if (req.body.linked_in) profileFields.linked_in = req.body.linked_in;
    if (req.body.instagram) profileFields.instagram = req.body.instagram;
    if (req.body.twitter) profileFields.twitter = req.body.twitter;
    console.log(profileFields);
    const check_user = `SELECT * FROM profile WHERE user_id ='${
      profileFields.user_id
    }'`;
    db.query(check_user, (err, result) => {
      if (err) console.log(err);
      if (Object.keys(result).length === 0) {
        //check if handle exists
        const check_handle = `SELECT * FROM profile WHERE handle ='${
          profileFields.handle
        }'`;
        db.query(check_handle, (err, result) => {
          if (err) console.log(err);
          if (Object.keys(result).length > 0) {
            errors.handle = "that handle already exists";
            res.status(400).json(errors);
          } else {
            const create_user = `INSERT INTO profile SET ?`;
            db.query(create_user, profileFields, (err, result) => {
              if (err) console.log(err);
              res.json(profileFields);
            });
          }
        });
      } else {
        const update_user = `UPDATE profile SET ? WHERE user_id = '${
          profileFields.user_id
        }'`;
        db.query(update_user, profileFields, (err, result) => {
          if (err) console.log(err);
          res.json(profileFields);
        });
      }
    });
  }
);

// POST api/profile/experience
// add experience to profile
// access public

router.get("/all", (req, res) => {
  const errors = {};
  const sql = `SELECT * FROM profile`;
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    if (Object.keys(result).length === 0) {
      errors.noProfiles = "No profiles at the moment";
      res.status(404).json(errors);
    } else {
      // res.json(user);
      res.json(result);
    }
  });
});

module.exports = router;
