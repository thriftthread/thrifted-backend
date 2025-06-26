const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  customer: {
  name: String,
  email: String,
  phone: String,
  address: {
    state: String,
    city: String,
    pincode: String,
    line: String
  }
}
,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
