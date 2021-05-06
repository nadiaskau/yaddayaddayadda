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

/* var upload = multer({
    storage: storage, fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        return cb(null, true);
    }
}) */


var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    },
    fileFilter : function(req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/gif' ) {
            req.flash('error', 'Wrong format!');
            return cb(null, false);
        }
        cb(null, true);
    }
})


exports.storage = storage;
exports.upload = upload;