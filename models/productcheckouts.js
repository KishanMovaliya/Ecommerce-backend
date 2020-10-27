const mongoose = require("mongoose");

// schema for checkout product
const productcheckoutsSchema = new mongoose.Schema({
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
  status: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Productcheckout", productcheckoutsSchema);
