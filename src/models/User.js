const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("user", UserSchema);
