const mongoose = require("mongoose");

//create category schema
const categoriesSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categoriesSchema);
