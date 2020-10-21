const mongoose = require("mongoose");

//-----Register Schema-----
const registerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Register", registerSchema);
