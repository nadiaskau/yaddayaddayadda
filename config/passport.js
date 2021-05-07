const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
var sanitize = require('mongo-sanitize');

// Load User model
const model = require('../models/user/user');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      //Make sure the email is lowercase
      email = email.toLowerCase(); 

      // Match user
      model.User.findOne({
        email: email
      }).then(user => {
        if (!user) { //if the user does not exist 
          return done(null, false, { message: 'That email is not registered' });
        }
        if(user.activated == false) { //if the user is not activated
          return done(null, false, { message: 'Check your email for verification link' });
        }
        
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Username or password incorrect' }); //passwords is incorrect, but we don't want to say that out loud
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    model.User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};