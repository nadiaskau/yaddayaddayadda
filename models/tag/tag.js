const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
    name: String, 
    createdBy: mongoose.Schema.Types.ObjectId, 
});

const Tag = mongoose.model("Tag", tagSchema, 'tags');

exports.Tag = Tag; 
