const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const db = require("../models/dbconnection");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new jwtStrategy(opts, (jwt_payload, done) => {
      sql = `SELECT id, name, avatar, email, password, date FROM users WHERE id ='${
        jwt_payload.id
      }'`;
      db.query(sql, (err, result) => {
        if (err) {
          return done(err, false);
        }
        if (result) {
          const user = {
            id: result[0].id,
            name: result[0].name,
            avatar: result[0].avatar,
            date: result[0].date,
            email: result[0].email,
            password: result[0].password
          };

          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
