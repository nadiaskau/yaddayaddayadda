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
        console.log(user);
        if (!user) {
          return done(null, false);
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
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
    done(null, user.id);
    
  });

  passport.deserializeUser(function(id, done) {
    handler.findUserwithId(id, function(err, user) {
      done(err, user);
    });
  });
};