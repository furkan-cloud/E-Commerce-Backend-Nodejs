const User = require("../models/User");

const list = () => {
  return User.find({});
};

const insert = (data) => {
  return new User(data).save();
};

const findOne = (where) => {
  return User.findOne(where);
};
const deleteDoc = () => {};
const updateDoc = () => {};

module.exports = {
  list,
  insert,
  findOne,
  deleteDoc,
  updateDoc,
};
