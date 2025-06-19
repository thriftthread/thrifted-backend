const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  const savedOrder = await order.save();
res.status(201).json({ message: "Order placed successfully!", order: savedOrder });

});

module.exports = router;
