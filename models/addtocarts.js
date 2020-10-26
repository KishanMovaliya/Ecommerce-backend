const mongoose = require("mongoose");

//----schema for add to cart product for user ------
const schemaAddToCart = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: 0,
  },
  qty: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("Addtocart", schemaAddToCart);
