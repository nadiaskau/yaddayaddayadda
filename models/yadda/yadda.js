const mongoose = require("mongoose");

const yaddaSchema = mongoose.Schema({
    createdBy: mongoose.Schema.Types.ObjectId, 
    createdByName: {type: String, default: null},
    avatarId: {type: mongoose.Schema.Types.ObjectId, default: null},
    timestamp: {type: Date, default: Date.now()},
    text: String, 
    //img: { data: Buffer, contentType: String },
    tags: [mongoose.Schema.Types.ObjectId], 
    replies: [mongoose.Schema.Types.ObjectId]
});

const Yadda = mongoose.model("Yadda", yaddaSchema, 'yadda');

exports.Yadda = Yadda; 
