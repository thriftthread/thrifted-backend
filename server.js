const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 👇 Import all routes
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");
const userCartRoutes = require("./routes/userCart");

// 👇 Use the routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user", userCartRoutes); // same base path is okay

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log("🚀 Server running on port", process.env.PORT || 5000);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
const User = require("../models/User"); // at the top if not already there

// ✅ POST /api/user/save
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
