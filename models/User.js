const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  cart: {
    type: [Object],
    default: []
  }
});

module.exports = mongoose.model("User", userSchema);
