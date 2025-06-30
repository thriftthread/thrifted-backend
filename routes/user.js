const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ POST /api/user/save
router.post("/save", async (req, res) => {
  try {
    const { uid, phone } = req.body;

    if (!uid || !phone) {
      return res.status(400).json({ message: "Missing UID or phone number" });
    }

    // 🔍 Check if user already exists
    let user = await User.findOne({ uid });

    // ➕ If not, create new user
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
