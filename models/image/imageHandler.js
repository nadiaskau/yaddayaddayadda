const model = require('./image');
const mongooseWrap = require('../../lib/mongooseWrap');


exports.createimage = async function (req, res) {
    
 
};

exports.readImage = async function(req, res){
    try {
        let image = await mongooseWrap.retrieve(model.Image);
        return image;
        
    } catch (error) {
        console.log(error);
    }
}
