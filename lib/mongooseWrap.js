const mongoose = require('mongoose');
require('dotenv').config();

/* //Connection to mongodb server
const dbname = 'yadda';
const constr = process.env.MONGO_URL + dbname;
const conparam = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const db = mongoose.connection; */

exports.retrieveSorted = async function (Model, query, sortQuery) {
  let stuff = null;
/*   await mongoose.connect(constr, conparam);
  db.once('open', function () {
    //open connection
  }); */

  try {
    stuff = await Model.find(query).sort(sortQuery); //find data
  } catch (err) {
    console.log(err);
  } finally {
    //db.close();
    return stuff;
  }
};


exports.retrieve = async function (Model, query) {
  let stuff = null;
/*   await mongoose.connect(constr, conparam);
  db.once('open', function () {
    //open connection
  }); */

  try {
    stuff = await Model.find(query); //find data
  } catch (err) {
    console.log(err);
  } finally {
    //db.close();
    return stuff;
  }
};


exports.retrieveOne = async function (Model, query) {
  let stuff = null;
/*   await mongoose.connect(constr, conparam);
  db.once('open', function () {
    //open connection
  }); */

  try {
    stuff = await Model.findOne(query); //find data
  } catch (err) {
    console.log(err);
  } finally {
    //db.close();
    return stuff;
  }
};

exports.retrieveWithId = async function (Model, id) {
  let stuff = null;
/*   await mongoose.connect(constr, conparam);
  db.once('open', function () {
    //open connection
  }); */

  try {
    stuff = await Model.findById(id); //find document by ID 
    
  } catch (err) {
    console.log(err);
  } finally {
    //db.close();
    return stuff;
  }
};

exports.retrieveImg = async function(Model, query){
/*   await mongoose.connect(constr, conparam);
  db.once('open', function () {
    //open connection
  }); */

  try {
    
  } catch (error) {
    console.log(error);
  }
}

exports.save = async function (obj) {
/*   await mongoose.connect(constr, conparam);
  db.once('open', function () {
    //open connection
  }); */

  let saved;
  try {
    await obj.save();
    //db.close();
    console.log('Saved to db');
    saved = true;
    return saved;
  } catch (e) {
    saved = false;
    console.log(e);
    return saved;
  }
};

exports.saveAndReturn = async function (obj) {
/*   await mongoose.connect(constr, conparam);
  db.once('open', function () {
    //open connection
  }); */
  try {
    await obj.save();
    //db.close();
    console.log('Saved to db');
    return obj;
    
  } catch (e) {
    console.log(e);
  }
};

exports.update = async function (Model, query, updateQuery) {
/*   await mongoose.connect(constr, conparam);
  db.once('open', function () {
    //open connection
  }); */

  try {
    await Model.findOneAndUpdate(query, updateQuery); //find data
  } catch (err) {
    console.log(err);
  } finally {
    //db.close();
  }
};

exports.updateWithID = async function (Model, id, updateQuery) {
/*   await mongoose.connect(constr, conparam);
  db.once('open', function () {
    //open connection
  }); */

  try {
    await Model.findByIdAndUpdate(id, updateQuery); //find data
  } catch (err) {
    console.log(err);
  } finally {
    //db.close();
  }
};