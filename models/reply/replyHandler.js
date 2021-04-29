const mongooseWrap = require('../../lib/mongooseWrap');
const modelYadda = require('../yadda/yadda');
const modelUser = require('../user/user');
const model = require('./reply');


exports.createReply = async function (req, res) {
    let reply = new model.Reply({
        yaddaId : req.params.yadda, 
      createdBy: req.session.passport.user,
      content: req.body.reply,
    });
    
    let savedReply = await mongooseWrap.saveAndReturn(reply); 
    return savedReply; 
  };

  exports.readRepliesByIds = async function(array){
    let query = {_id: {$in: array}}; //array of reply id's 
    let replies = await mongooseWrap.retrieve(model.Reply, query); 
    
    for (let i = 0; i < replies.length; i++) {
      let user = await mongooseWrap.retrieveWithId(modelUser.User, replies[i].createdBy);
      replies[i].createdByName = user.name;
  }
    return replies; 
};