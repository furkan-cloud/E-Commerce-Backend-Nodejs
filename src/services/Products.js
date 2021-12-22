const Product = require("../models/Product");

const list = () => {
  return Product.find({});
};

const insert = (data) => {
  return new Product(data).save();
};

const findOne = (where) => {
  return Product.findOne(where);
};
const deleteDoc = () => {};
const updateDoc = (docID, updateData) => {
  return Product.findByIdAndUpdate(docID, updateData, { new: true });
};

module.exports = {
  list,
  insert,
  findOne,
  deleteDoc,
  updateDoc,
};
