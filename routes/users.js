var express = require('express');
const { models } = require('mongoose');
require('dotenv').config();
var router = express.Router();
const handler = require('../models/user/userHandler');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { forwardAuthenticated } = require('../lib/auth');
const { ensureAuthenticated } = require('../lib/auth');
var image = require('../lib/image');

router.get('/createuser', forwardAuthenticated, function (req, res, next) {
  res.render('createuser', { title: 'Create user', loggedin: false });
});

router.get('/login', forwardAuthenticated, function (req, res, next) {
  res.render('login', { title: 'Your credentials', loggedin: false, styleSpecific: "login" });
  
});


router.get('/theme', ensureAuthenticated, async function (req, res, next) {
  let user = await handler.findUserwithId(req.session.passport.user); 
  res.json(user); 
});

router.post('/login',  
  //Passport authentication of login
  function (req, res, next) {
    
  passport.authenticate('local', {
    successRedirect: '../',
    failureRedirect: '/users/login',
    failureFlash: true
  })
  
  (req, res, next);
    
});

//Pending user
router.get('/pending', forwardAuthenticated, function (req, res, next) {
  res.render('pending', { title: 'Pending', loggedin: false});
});

//Register
router.post('/createuser', 
  //Uploading our picture
  image.upload.single('avatar'), 
  //Checking password and creating user
  async function (req, res) {
  const { name, email, password, passwordRepeat } = req.body;
  let errors = []; 
  //Making sure the passwords match
  if (password != passwordRepeat) {
    errors.push({msg: 'Passwords do not match'}); 
  } 
  //Password must be more than 6 characters
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  
  if(errors.length > 0){
    //Render
    res.render('createuser', {
      title: 'Create user', 
      loggedin: false,
      errors,
      name,
      email
    });
  } else {
    await handler.createUser(req);
    res.redirect('/users/pending');
    
  }
});

//URL in confirmation email
router.get('/confirmation/:token', (req, res) => {
  try {
    const verifiedEmail = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    handler.updateUser(
      req,
      res,
      { email: verifiedEmail.user },
      { $set: { activated: true } }
    );
  } catch (e) {
    res.send('err');
    console.log(e);
  }

  return res.redirect('http://localhost:3000/');
});

//Follow a certain user
router.get('/follow', ensureAuthenticated, async function(req, res){
  //Update loggedin user with push to 'following'
  await handler.updateUser(req, res, 
    {_id: req.session.passport.user}, 
    {$push: {following: req.query.id}});
  //Update the followed user with push to 'followers' 
  await handler.updateUser(req, res, 
    {_id: req.query.id}, 
    {$push: {followers: req.session.passport.user}})
  res.redirect('../../')
})

//List of followers and followed users
router.get('/following', ensureAuthenticated, async function(req, res){
  let user = await handler.findUserwithId(req.session.passport.user); 
  let following = await handler.findUsers({_id: {$in: user.following}}); 
  let followers = await handler.findUsers({_id: {$in: user.followers}}); 
  res.render('following', {following: following, followers: followers});
})

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


module.exports = router;
