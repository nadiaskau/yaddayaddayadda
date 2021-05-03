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
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
  
var upload = multer({ storage: storage, limits: {
    fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){ //to restrict the user from uploading other files than jpg, jpeg and png
        cb(new Error('Please upload an image.'))
    }
    cb(undefined, true)
    }
    })

exports.storage = storage; 
exports.upload = upload; 