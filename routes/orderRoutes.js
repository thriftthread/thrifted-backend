const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 🔻 POST /api/order - create order
router.post('/', async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    const newOrder = new Order({ userId, items, total });
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder); // 🟢 return order with _id
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// 🔺 GET /api/order/:id - get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching order' });
  }
});

module.exports = router;
