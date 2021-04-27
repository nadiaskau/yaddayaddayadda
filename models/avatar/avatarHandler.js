const model = require('./avatar');
const bcrypt = require('bcrypt');
const mongooseWrap = require('../../lib/mongooseWrap');


exports.createAvatar = async function (req, res) {
    
 
};

exports.readAvatar = async function(req, res){
    try {
        let avatar = await mongooseWrap.retrieve(model.Avatar);
        return avatar;
        
    } catch (error) {
        console.log(error);
    }
}
