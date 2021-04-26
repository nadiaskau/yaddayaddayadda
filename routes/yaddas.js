var express = require('express');
var router = express.Router();
const handler = require('../models/yadda/yaddaHandler');
const handlerTag = require('../models/tag/tagHandler');

router.get('/', async function(req, res, next) {
    let tags = await handlerTag.readTags(); 
    res.render('yaddas', {title:'YaddaYaddaYadda', tags: tags});
  });

module.exports = router;