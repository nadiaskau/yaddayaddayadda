const mongooseWrap = require('../../lib/mongooseWrap');
const modelYadda = require('../yadda/yadda');
const modelUser = require('../user/user');
const model = require('./reply');


exports.createReply = async function (req, res) {
    let reply = new model.Reply({
        yaddaId : req.params.yadda, 
      createdBy: "6087ae1503767f74dccd8159", //CHANGE THIS ONE
      content: req.body.reply,
    });
    
    let savedReply = await mongooseWrap.saveAndReturn(reply); 
    return savedReply; 
  };

  exports.readRepliesByIds = async function(array){
    let query = {_id: {$in: array}}; 
    let replies = await mongooseWrap.retrieve(model.Reply, query); 
    console.log(replies);
    return replies; 
};