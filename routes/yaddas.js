var express = require('express');
var router = express.Router();
const handler = require('../models/yadda/yaddaHandler');
const handlerTag = require('../models/tag/tagHandler');
const handlerAvatar = require('../models/avatar/avatarHandler');
const handlerReply = require('../models/reply/replyHandler');

router.get('/', async function(req, res, next) {
    let tags = await handlerTag.readTags(); 
    let avatars = await handlerAvatar.readAvatar();
    let yaddas = await handler.readYaddas(); //read all posts 

    //let avatarsOLD = new Buffer(avatars[0].img.data).toString('base64');
    
    res.render('yaddas', {title:'YaddaYaddaYadda', tags: tags, avatars: avatars, yaddas: yaddas});
  });

router.post('/', function(req, res, next){
  handler.createYadda(req); 
});

router.post('/:yadda', async function(req, res, next){
  handlerReply.createReply(req, res);
});

module.exports = router;