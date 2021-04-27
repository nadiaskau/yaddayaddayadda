const mongoose = require("mongoose");

const avatarSchema = mongoose.Schema({
   
});

const Avatar = mongoose.model("Avatar", avatarSchema, 'avatar');

exports.Avatar = Avatar; 
