const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register/Login (simple version)
router.post("/login", async (req, res) => {
  const { phone } = req.body;
  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({ phone });
  }

  res.json({ userId: user._id, message: "Login success!" });
});
module.exports = router;
