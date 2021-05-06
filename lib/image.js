//This setup and function are inspired from here: https://github.com/bradtraversy/nodeuploads/blob/master/app.js 

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

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    },
    fileFilter : function(req, file, cb) {

    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        req.flash('error', 'Wrong format!');
        return cb(null, false);
    }
    } 
})


exports.storage = storage;
exports.upload = upload;