const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get cart for a user
router.get("/:userId/cart", async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.json(user.cart || []);
});

// Save cart for user
router.post("/:userId/cart", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, {
    cart: req.body.cart
  }, { new: true });

  res.json({ message: "Cart saved", cart: user.cart });
});

// Clear cart
router.delete("/:userId/cart", async (req, res) => {
  await User.findByIdAndUpdate(req.params.userId, { cart: [] });
  res.json({ message: "Cart cleared" });
});

module.exports = router;
