const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 📦 Create a new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save(); // ✅ save once
    res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder // includes _id, total, items, status, etc.
    });
  } catch (err) {
    console.error("❌ Order save error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

module.exports = router;
