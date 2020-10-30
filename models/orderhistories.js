const mongoose = require("mongoose");

// schema for checkout product
const orderhistoriesSchema = new mongoose.Schema({
  addtocartId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addtocart",
      required: true,
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Orderhistory", orderhistoriesSchema);
