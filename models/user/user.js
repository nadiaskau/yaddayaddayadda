const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    activated: {type: Boolean, default: false},
    avatarId: {type: mongoose.Schema.Types.ObjectId}, 
    followers: {type:[mongoose.Schema.Types.ObjectId]}, 
    following: {type:[mongoose.Schema.Types.ObjectId]}
});

const User = mongoose.model("User", userSchema, 'user');

exports.User = User; 