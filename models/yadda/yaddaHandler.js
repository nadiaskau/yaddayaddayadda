const mongooseWrap = require('../../lib/mongooseWrap');
const model = require('./yadda');
const modelTag = require('../tag/tag');
const modelUser = require('../user/user');



exports.createYadda = async function (req, res) {
    let yadda = new model.Yadda({
      createdBy: "608681a3ed6e2447b024b0e3", //CHANGE THIS ONE
      text: req.body.text,
      tags: [req.body.tags], 
    });
  
    await mongooseWrap.save(yadda);
    
  };

exports.readYaddas = async function(req, res, query){
    try {
    let yaddas = await mongooseWrap.retrieve(model.Yadda, query);
    for (let i = 0; i < yaddas.length; i++) {
        let user = await mongooseWrap.retrieveWithId(modelUser.User, yaddas[i].createdBy);
        yaddas[i].createdByName = user.name;
        
        let tagText = await mongooseWrap.retrieveWithId(modelTag.Tag, yaddas[i].tags[0]); 
        yaddas[i].tags[0] = tagText.name; 
        
    }
    console.log(yaddas);
    return yaddas;

    } catch (error) {
    console.log(error);
    }
}