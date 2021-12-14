const User = require("../models/User");

const insert = (data) => {
  return new User(data).save();
};

const list = () => {
  return User.find({});
};

module.exports = {
  list,
  insert,
};
