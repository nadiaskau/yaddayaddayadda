const mongooseWrap = require('../../lib/mongooseWrap');
const model = require('./yadda');

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
    
    return yaddas;

    } catch (error) {
    console.log(error);
    }
}