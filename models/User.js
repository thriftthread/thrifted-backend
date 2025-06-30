const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  cart: {
    type: [Object],
    default: []
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
