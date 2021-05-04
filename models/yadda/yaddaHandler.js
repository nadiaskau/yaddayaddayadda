const mongooseWrap = require('../../lib/mongooseWrap');
const model = require('./yadda');
const modelTag = require('../tag/tag');
const modelUser = require('../user/user');
const modelImage = require('../image/image');
var fs = require('fs');
var path = require('path');


exports.createYadda = async function (req, res) {
  let yadda;

  //HANDLING OUR TAG
  let tagname = req.body.tag;
  //if tag doesn't start with '#'
  if(req.body.tag.charAt(0) !== "#") {
    tagname = "#" + req.body.tag; 
  }
  //searching for the tag
  let tagExist = await mongooseWrap.retrieve(modelTag.Tag, {name: tagname}); 
  let savedTag; 

  //If tag doesn't exists
  if(tagExist.length <= 0 ){ 
    console.log('Halløj');
    let tag = new modelTag.Tag({
      name : tagname,
      createdBy: req.session.passport.user
    });
    savedTag = await mongooseWrap.saveAndReturn(tag);
    //If the tag exists
  } else { 
      savedTag = tagExist[0]; 
  }

  //HANDLING PICTURE
  //If there is a picture in the post
  if(req.file != null){ 
    let image = new modelImage.Image({ 
      img: {
        data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
        contentType: 'image/png'
      }
    });
    savedImage = await mongooseWrap.saveAndReturn(image); 
    yadda = new model.Yadda({
      createdBy: req.session.passport.user, 
      text: req.body.text,
      tags: [savedTag.id], 
      imgId: savedImage.id,
      timestamp: Date.now()
      
    });
    //No picture in the post
  } else { 
    yadda = new model.Yadda({
      createdBy: req.session.passport.user, 
      text: req.body.text,
      tags: [savedTag.id],
      timestamp: Date.now()
    });
  }

  //Saving our yadda
  await mongooseWrap.save(yadda);
    
  };

  //Read all our yaddas
exports.readYaddas = async function(query){
    try {
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