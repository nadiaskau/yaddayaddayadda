const mongoose = require("mongoose");

const replySchema = mongoose.Schema({
    yaddaId: mongoose.Schema.Types.ObjectId,
    createdBy: mongoose.Schema.Types.ObjectId,
    timestamp: {type: String}, 
    content: String,
    createdByName: {type: String, default: null}
});

const Reply = mongoose.model("Reply", replySchema, 'reply');

exports.Reply = Reply;
