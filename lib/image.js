var multer = require('multer');
var fs = require('fs');
var path = require('path');
var modelUser = require('../models/user/user');

//Multer setup - for our image upload
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

exports.storage = storage; 
exports.upload = upload; 