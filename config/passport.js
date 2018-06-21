const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      // console.log("deserialising user:".user)
      done(err, user);
    });
  });

  passport.use("local-signup", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true // allows us to pass the request to the callback
  }, function (req, email, password, done) {
    process.nextTick(function () {
      User.findOne({
        "email": email
      }, function (err, user) {
        if (err)
          return done(err);
        if (user) {
          return done(null, false, req.flash("signupMessage", "That email is taken"));
        } else {
          let newUser = new User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.save(function (err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use("local-login", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({
      "email": email
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, req.flash("loginMessage", "No user found"));
      }
      if (!user.validPassword(password))
        return done(null, false, req.flash("loginMessage", "Oops, wrong password!"));
      return done(null, user);
    });
  }));
};