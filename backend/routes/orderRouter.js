const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/auth");

const orderRouter = express.Router();

//@route GET /api/orders/my-orders
//@desc Get logged-in user's orders
//@access Private
orderRouter.get("/my-orders", protect, async (req, res) => {
  try {
    // Find orders for the logged-in user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route GET /api/orders/:id
//@desc Get the order details by ID
//@access Private

orderRouter.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );

    // check order found
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = orderRouter;
