const model = require('./user');
const bcrypt = require('bcrypt');
const mongooseWrap = require('../../lib/mongooseWrap');
const avatarModel = require('../avatar/avatar'); 

const mailservice = require('../../lib/mailService');

exports.createUser = async function (req, res) {
  let hash = await bcrypt.hash(req.body.password, 10);

  let avatar = new avatarModel.Avatar({ 
    img: {
      data: req.body.avatar,
      contentType: 'image/png'
  }
  }); 
  let savedAvatar = await mongooseWrap.save(avatar); 

  let user = new model.User({
    name: req.body.name,
    email: req.body.email,
    password: hash
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
  console.log(query);
  try {
    let user = mongooseWrap.retrieve(model.User, query);
    return user;
  } catch (error) {
    console.log(error);
  }
};
