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
    await mongooseWrap.saveAndReturn(reply).then(async function(savedReply){
        let yadda = await mongooseWrap.retrieveWithId(modelYadda.Yadda, req.params.yadda);
        console.log(savedReply);
    });
    
    
  };
