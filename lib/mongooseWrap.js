const mongoose = require('mongoose');

//Connection to mongodb server
const dbname = 'yadda';
const constr = `mongodb://localhost:27017/${dbname}`;
const conparam = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const db = mongoose.connection;

exports.retrieve = async function (Model, query) {
  let stuff = null;
  await mongoose.connect(constr, conparam);
  db.once('open', function () {
    //open connection
  });

  try {
    stuff = await Model.find(query); //find data
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
    return stuff;
  }
};

exports.save = async function (obj) {
  await mongoose.connect(constr, conparam);
  db.once('open', function () {
    //open connection
  });

  let saved;
  try {
    await obj.save();
    db.close();
    console.log('Saved to db');
    saved = true;
    return saved;
  } catch (e) {
    saved = false;
    console.log(e);
    return saved;
  }
};

exports.update = async function (Model, query, updateQuery) {
  await mongoose.connect(constr, conparam);
  db.once('open', function () {
    //open connection
  });

  try {
    await Model.findOneAndUpdate(query, updateQuery); //find data
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
};
