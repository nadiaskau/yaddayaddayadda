const model = require("./tag");
const mongooseWrap = require ('../../lib/mongooseWrap');

exports.readTags = async function(req, res, query){
    try {
        let tags = await mongooseWrap.retrieve(model.Tag, query);
        return tags;
        
    } catch (error) {
        console.log(error);
    }
  }