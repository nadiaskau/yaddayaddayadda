var express = require('express');
var router = express.Router();
const handler = require('../models/yadda/yaddaHandler');
const handlerTag = require('../models/tag/tagHandler');
const handlerAvatar = require('../models/avatar/avatarHandler');

router.get('/', async function(req, res, next) {
    let tags = await handlerTag.readTags(); 
    let avatars = await handlerAvatar.readAvatar();
    let avatarsOLD = new Buffer(avatars[0].img.data).toString('base64');
    
    res.render('yaddas', {title:'YaddaYaddaYadda', tags: tags, avatars: avatars});
  });

module.exports = router;