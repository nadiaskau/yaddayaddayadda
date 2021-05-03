var express = require('express');
const { models } = require('mongoose');
require('dotenv').config();
var router = express.Router();
const handler = require('../models/user/userHandler');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { forwardAuthenticated } = require('../lib/auth');
var image = require('../lib/image');

/* GET users listing. */
router.get('/createuser', forwardAuthenticated, function (req, res, next) {
  res.render('createuser', { title: 'Create user', loggedin: false });
});

router.get('/login', forwardAuthenticated, function (req, res, next) {
  res.render('login', { title: 'Your credentials', loggedin: false, styleSpecific: "login" });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '../',
    failureRedirect: '/users/login',
    failureFlash: true
  })
  (req, res, next);
});

router.get('/pending', forwardAuthenticated, function (req, res, next) {
  res.render('pending', { title: 'Pending', loggedin: false});
});

router.post('/createuser', image.upload.single('avatar'), async function (req, res) {

  if (req.body.password == req.body.passwordRepeat) {
    await handler.createUser(req);
    res.redirect('/users/pending');
  } else {
    res.render('createuser', { message: 'Passwords do not match' });
    // TODO - Logger / flash
  }
});

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

router.get('/follow', async function(req, res){
  console.log(req.query);
  await handler.updateUser(req, res, 
    {_id: req.session.passport.user}, 
    {$push: {following: req.query.id}});
  await handler.updateUser(req, res, 
    {_id: req.query.id}, 
    {$push: {followers: req.session.passport.user}})
  res.redirect('../../')
})

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  //req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


module.exports = router;
