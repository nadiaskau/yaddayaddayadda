const model = require('./user');
const bcrypt = require('bcrypt');
const mongooseWrap = require('../../lib/mongooseWrap');
const avatarModel = require('../avatar/avatar'); 
var fs = require('fs');
var path = require('path');
const imageService = require('../../lib/image');

const mailservice = require('../../lib/mailService');

exports.createUser = async function (req, res) {
  let hash = await bcrypt.hash(req.body.password, 10);
  let avatar = new avatarModel.Avatar({ 
    img: {
      data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
      contentType: 'image/png'
  }
  }); 
  let savedAvatar = await mongooseWrap.saveAndReturn(avatar); 

  let user = new model.User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    avatarId: savedAvatar.id
  });

  let saved = await mongooseWrap.save(user);
  if (saved) {
    mailservice.sendEmail(req.body.email);
  }
};

exports.updateUser = async function (req, res, query, updateQuery) {
  try {
    mongooseWrap.update(model.User, query, updateQuery);
  } catch (error) {
    console.log(error);
  }
};

exports.findUser = function(query){
  try {
    let user = mongooseWrap.retrieveOne(model.User, query);
    return user;
  } catch (error) {
    console.log(error);
  }
};

exports.findUsers = function(query){
  try {
    let users = mongooseWrap.retrieve(model.User, query);
    return users;
  } catch (error) {
    console.log(error);
  }
};

exports.findUserwithId = async function(id){
  try {
  let user = await mongooseWrap.retrieveWithId(model.User, id);
  return user;

  } catch (error) {
  console.log(error);
  }
};