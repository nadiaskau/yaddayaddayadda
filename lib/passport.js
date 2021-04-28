const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load User model
const User = require('../models/user/user');
const handler = require('../models/user/userHandler'); 

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      handler.findUser({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false);
        }

        // Match password
        bcrypt.compare(password, user[0].password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user[0].email);
    
  });

  passport.deserializeUser(function(user, done) {
    handler.findUser({email: user[0].email}, function(err, user) {
      done(err, user);
    });
  });
};