var express = require('express');
var router = express.Router();
const handler = require('../models/yadda/yaddaHandler');
const handlerTag = require('../models/tag/tagHandler');
const handlerAvatar = require('../models/avatar/avatarHandler');
const handlerReply = require('../models/reply/replyHandler');
const auth = require('../lib/auth');




router.get('/',  auth.ensureAuthenticated, async function (req, res) {
  console.log(req.session.passport);
  let tags = await handlerTag.readTags();
  let avatars = await handlerAvatar.readAvatar();
  let yaddas = await handler.readYaddas(); //read all posts 

    res.render('yaddas', {
      title: 'YaddaYaddaYadda',
      tags: tags,
      avatars: avatars,
      yaddas: yaddas,
      replies: "",
      loggedin: true
    });
});

router.post('/', function (req, res, next) {
  handler.createYadda(req);
  res.redirect('/');
});

router.get('/:yadda', auth.ensureAuthenticated, async function(req, res, next){
  let yadda = await handler.readYaddaWithId(req.params.yadda); 
  if(yadda.replies != null){
    var replies = await handlerReply.readRepliesByIds(yadda.replies);
  }
  
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