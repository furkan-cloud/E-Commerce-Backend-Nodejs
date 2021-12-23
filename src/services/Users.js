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

const findOneAndUpdate = (where, data) => {
  return User.findOneAndUpdate(where, data, { new: true });
};

const deleteDoc = () => {};
const updateDoc = () => {};

module.exports = {
  list,
  insert,
  findOne,
  deleteDoc,
  updateDoc,
  findOneAndUpdate,
};
