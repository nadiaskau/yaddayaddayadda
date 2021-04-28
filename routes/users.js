var express = require('express');
const { models } = require('mongoose');
require('dotenv').config();
var router = express.Router();
const handler = require('../models/user/userHandler');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { forwardAuthenticated } = require('../lib/auth');

/* GET users listing. */
router.get('/createuser', forwardAuthenticated, function (req, res, next) {
  res.render('createuser', { title: 'Create user' });
});

router.get('/login', forwardAuthenticated, function (req, res, next) {
  res.render('login', { title: 'Your credentials' });
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
  res.render('pending', { title: 'Pending' });
});

router.post('/createuser', async function (req, res) {
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

module.exports = router;
