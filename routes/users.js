var express = require('express');
const { models } = require('mongoose');
var router = express.Router();
const handler = require('../models/user/userHandler');

/* GET users listing. */
router.get('/createuser', function (req, res, next) {
  res.render('createuser', { title: 'Create user' });
});

router.get('/pending', function (req, res, next) {
  res.render('pending', { title: 'Pending' });
});

router.post('/createuser', async function (req, res) {
  console.log(req.body);
  if (req.body.password == req.body.passwordRepeat) {
    await handler.createUser(req);
    res.redirect('/users/pending');
  } else {
    console.log('Nope');
    res.render('createuser', { message: 'Passwords do not match' });
    // TODO - Logger / flash
  }
});

router.get('/confirmation/:token', async (req, res) => {
  try {
    const {
      user: { email },
    } = jwt.verify(req.params.token, EMAIL_SECRET);
    await handler.updateUser({ activated: true }, { where: { email } });
  } catch (e) {
    res.send('error');
  }

  return res.redirect('http://localhost:3000');
});

module.exports = router;
