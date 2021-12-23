const Product = require("../models/Product");
const BaseService = require("./BaseService");

class ProductService extends BaseService {
  constructor() {
    super(Product);
  }

  list() {
    return Product.find({})
      .populate({
        path: "comments",
        populate: {
          path: "user_id",
          select: "first_name last_name",
        },
      })
      .populate({
        path: "user_id",
        select: "first_name email",
      });
  };
}

module.exports = new ProductService();



