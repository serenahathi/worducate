const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use("local-signup", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true // allows us to pass the request to the callback
  }, function(req, email, password, done) {
    process.nextTick(function(){
      User.findOne({"local.email": email}, function(err, user){
        if (err)
          return done(err);
        if (user) {
          return done(null, false, req.flash("signupMessage", "That email is taken"));
        } else {
          let newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err)
            throw err;
            return done(null, newUser);
          });
        }
      });
    });
}));
};
