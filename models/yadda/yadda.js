const mongoose = require("mongoose");

const yaddaSchema = mongoose.Schema({
    createdBy: mongoose.Schema.Types.ObjectId, 
    createdByName: {type: String, default: null},
    avatarId: {type: mongoose.Schema.Types.ObjectId, default: null},
    timestamp: {type: String},
    text: String, 
    imgId: mongoose.Schema.Types.ObjectId, 
    tags: [mongoose.Schema.Types.ObjectId], 
    replies: [mongoose.Schema.Types.ObjectId]
});

const Yadda = mongoose.model("Yadda", yaddaSchema, 'yadda');

exports.Yadda = Yadda; 
