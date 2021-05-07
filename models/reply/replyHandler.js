const mongooseWrap = require('../../lib/mongooseWrap');
const modelYadda = require('../yadda/yadda');
const modelUser = require('../user/user');
const model = require('./reply');
const date = require('../../lib/date');


exports.createReply = async function (req, res) {
    let reply = new model.Reply({
      yaddaId : req.params.yadda, 
      createdBy: req.session.passport.user,
      content: req.body.reply,
      timestamp: date.formatedDate()
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
      replies[i].avatarId = user.avatarId; 
  }
    return replies; 
};