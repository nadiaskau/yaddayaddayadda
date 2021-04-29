var express = require('express');
const { models } = require('mongoose');
require('dotenv').config();
var router = express.Router();
const handler = require('../models/user/userHandler');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { forwardAuthenticated } = require('../lib/auth');

var multer = require('multer');
var fs = require('fs');
var path = require('path');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({ storage: storage }).single('avatar');


/* GET users listing. */
router.get('/createuser', forwardAuthenticated, function (req, res, next) {
  res.render('createuser', { title: 'Create user', loggedin: false });
});

router.get('/login', forwardAuthenticated, function (req, res, next) {
  res.render('login', { title: 'Your credentials', loggedin: false });
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

router.post('/createuser', async function (req, res) {
  console.log(req);
  upload(req, res, (err) => {
    if(err){
     console.log(err);
    } else {
      if(req.file == undefined){
        console.log("no file");
      } else {
        console.log("super");
      }
    }
  });

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

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  //req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


module.exports = router;
