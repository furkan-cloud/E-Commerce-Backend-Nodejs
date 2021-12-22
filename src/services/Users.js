const User = require("../models/User");

const insert = (data) => {
  return new User(data).save();
};

const list = () => {
  return User.find({});
};
const findOne = () => {};
const deleteDoc = () => {};
const updateDoc = () => {};

module.exports = {
  list,
  insert,
  findOne,
  deleteDoc,
  updateDoc,
};
