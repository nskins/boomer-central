const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.js');

module.exports = () => {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy((username, password, done) => {
    User.findOne({ 'username': username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
  }));

  passport.use('signup', new LocalStrategy((username, password, done) => {
    User.findOne({ 'username': username }, (err, user) => {
      if (err) { return done(err); }
      if (user) { return done(null, false); }
      else {
        var newUser = new User();
        newUser.username = username;
        newUser.password = password;

        // Create the user's account.
        newUser.save((err) => {
          if (err) { return done(err); }
          return done(null, newUser);
        });
      }
    });
  }));
};