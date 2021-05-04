const model = require("./tag");
const mongooseWrap = require ('../../lib/mongooseWrap');

exports.readTags = async function(req, res, query){
    try {
        let tags = await mongooseWrap.retrieve(model.Tag, query);
        return tags;
        
    } catch (error) {
        console.log(error);
    }
  };


  exports.saveTag = async function(tagname, req, res){

    if(tagname.charAt(0) !== "#") {
        tagname = "#" + tagname; 
      }

      let tag = new model.Tag({
          name : tagname,
          createdBy: req.session.passport.user
      });

      let savedTag = await mongooseWrap.saveAndReturn(tag);

      return savedTag;
  }
