const mongoose = require("mongoose");

const avatarSchema = mongoose.Schema({
   img: { data: Buffer, contentType: String }
});

const Avatar = mongoose.model("Avatar", avatarSchema, 'avatar');

exports.Avatar = Avatar; 
