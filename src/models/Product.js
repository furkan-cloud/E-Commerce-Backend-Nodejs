const Mongoose = require("mongoose");

const ProductSchema = new Mongoose.Schema(
  {
    name: String,
    description: String,
    quantity: Number,
    unit_price: Number,
    category: [String],
    //! user isAdmin?
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
    },
    // rate: Number,
    media: String, // birden çok olacaksa [String]
    comments: [
      {
        rate:Number,
        comment: String,
        created_at: Date,
        user_id: {
          type: Mongoose.Types.ObjectId,
          ref: "user",
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("product", ProductSchema);
