const mongoose = require("mongoose");

//create sub category schema
const subcategoriesSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Subcategory", subcategoriesSchema);
