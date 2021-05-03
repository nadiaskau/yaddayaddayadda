const mongooseWrap = require('../../lib/mongooseWrap');
const model = require('./yadda');
const modelTag = require('../tag/tag');
const modelUser = require('../user/user');
const modelImage = require('../image/image');
var fs = require('fs');
var path = require('path');


exports.createYadda = async function (req, res) {
  let image = new modelImage.Image({ 
    img: {
      data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
      contentType: 'image/png'
  }
  });
  let savedImage = await mongooseWrap.saveAndReturn(image); 

    let yadda = new model.Yadda({
      createdBy: req.session.passport.user, 
      text: req.body.text,
      tags: [req.body.tags], 
      imgId: savedImage.id
    });
  
    await mongooseWrap.save(yadda);
    
  };

  //Read all our yaddas
exports.readYaddas = async function(req, res){
    try {
    let query = {};
    let sortQuery = {timestamp: -1};
    let yaddas = await mongooseWrap.retrieveSorted(model.Yadda, query, sortQuery);
    for (let i = 0; i < yaddas.length; i++) {
        let user = await mongooseWrap.retrieveWithId(modelUser.User, yaddas[i].createdBy);
        yaddas[i].createdByName = user.name;
        let tagText = await mongooseWrap.retrieveWithId(modelTag.Tag, yaddas[i].tags[0]); 
        yaddas[i].tags[0] = tagText.name; 
        yaddas[i].avatarId = user.avatarId; 
    }
    return yaddas;

    } catch (error) {
    console.log(error);
    }
};

// Read Yadda with ID  
exports.readYaddaWithId = async function(id){
  try {
  let yadda = await mongooseWrap.retrieveWithId(model.Yadda, id);
  return yadda;

  } catch (error) {
  console.log(error);
  }
};

exports.updateYadda = async function(id, updatequery){
  try {
      await mongooseWrap.updateWithID(model.Yadda, id, updatequery);
      
  } catch (error) {
      console.log(error);
  }
}