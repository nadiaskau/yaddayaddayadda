const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
    name: {type: String, unique: true}, 
    createdBy: mongoose.Schema.Types.ObjectId, 
});

const Tag = mongoose.model("Tag", tagSchema, 'tags');

exports.Tag = Tag; 
