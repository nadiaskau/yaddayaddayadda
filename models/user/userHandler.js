const model = require("./user");
const bcrypt = require("bcrypt"); 
const mongooseWrap = require ('../../lib/mongooseWrap');

exports.createUser = async function(req, res){
    let hash = await bcrypt.hash(req.body.password, 10);

    let user = new model.User({
        name: req.body.name, 
        email: req.body.email,
        password: hash, 
      });
    
    await mongooseWrap.save(user); 
}