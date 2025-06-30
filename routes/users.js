const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Register/Login (via phone)
router.post("/login", async (req, res) => {
  const { phone } = req.body;
  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({ phone });
  }

  res.json({ userId: user._id, message: "Login success!" });
});

// ✅ Save UID & Phone from Firebase Login
router.post("/save", async (req, res) => {
  try {
    const { uid, phone } = req.body;

    if (!uid || !phone) {
      return res.status(400).json({ message: "Missing UID or phone number" });
    }

    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, phone });
      await user.save();
    }

    res.status(201).json({ message: "✅ User saved", user });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
