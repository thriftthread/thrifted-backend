const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 📦 Create a new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder
    });
  } catch (err) {
    console.error("❌ Order save error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// 👀 View all orders - only for allowed staff
router.get("/", async (req, res) => {
  const allowedPhones = ["+91 93693 51654"]; // 👈 Add bhaiya's number here
  const phone = req.headers["x-user-phone"];

  if (!allowedPhones.includes(phone)) {
    return res.status(403).json({ message: "⛔ Access denied" });
  }

  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
