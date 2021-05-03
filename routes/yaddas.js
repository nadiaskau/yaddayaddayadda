var express = require('express');
var router = express.Router();
const handler = require('../models/yadda/yaddaHandler');
const handlerTag = require('../models/tag/tagHandler');
const handlerAvatar = require('../models/avatar/avatarHandler');
const handlerReply = require('../models/reply/replyHandler');
const handlerImage = require('../models/image/imageHandler');
const handlerUser = require('../models/user/userHandler');
const auth = require('../lib/auth');
var image = require('../lib/image');

router.get('/',  auth.ensureAuthenticated, async function (req, res) {
  //console.log(req.session.passport);
  let tags = await handlerTag.readTags();
  let avatars = await handlerAvatar.readAvatar();
  let yaddas = await handler.readYaddas(); //read all posts 
  let images = await handlerImage.readImages(); 
  let usersQuery = { _id: { $ne: req.session.passport.user } }; //find all users except the loggedin user
  let users = await handlerUser.findUsers(usersQuery); 
  console.log(users);

    res.render('yaddas', {
      title: 'YaddaYaddaYadda',
      tags: tags,
      avatars: avatars,
      yaddas: yaddas,
      images: images,
      replies: "",
      users: users,
      loggedin: true
    });
});

router.post('/', image.upload.single('img'), function (req, res, next) {
  console.log(req.file);
  handler.createYadda(req);
  res.redirect('/');
});

router.get('/yadda', auth.ensureAuthenticated, async function(req, res, next){
  console.log(req.query);
  let yadda = await handler.readYaddaWithId(req.query.id); 
  var replies = await handlerReply.readRepliesByIds(yadda.replies);

  let tags = await handlerTag.readTags();
  let avatars = await handlerAvatar.readAvatar();
  let yaddas = await handler.readYaddas(); //read all posts 

  res.render('yaddas', {
    title: 'YaddaYaddaYadda',
    tags: tags,
    avatars: avatars,
    yaddas: yaddas, 
    replies: replies,
    loggedin: true
  });
  
}) 

router.post('/:yadda', async function (req, res, next) {
  let savedReply = await handlerReply.createReply(req, res);
  let updateQuery = {
    $push: {
      replies: savedReply.id
    }
  };
  await handler.updateYadda(req.params.yadda, updateQuery); //updating yadda with replies

  res.redirect('/');
});


module.exports = router;