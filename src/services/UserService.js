const User = require("../models/User");
const BaseService = require("./BaseService");

class UserService extends BaseService {
  constructor() {
    super(User);
  }
}

module.exports = new UserService();



