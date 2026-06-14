const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/auth");
const orderRouter = require("./orderRouter");

const adminOrderRouter = express.Router();

//@route GET /api/admin/orders
//@desc Get all the orders
//@access Private/Admin
adminOrderRouter.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route PUT /api/admin/orders/:id
//@desc Update the order status
//@access Private/Admin
adminOrderRouter.put("/:id", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = status || order.status;
      order.isDelivered =
        status === "Delivered" ? true : orderRouter.isDelivered;
      order.deliveredAt =
        status === "Delivered" ? Date.now() : order.deliveredAt;

      // update the changes
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route DELETE /api/admin/orders/:id
//@desc Delete an order
//@access Private/Admin

adminOrderRouter.delete("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      await order.deleteOne();
      res.status(200).json({ message: "Order are deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (e) {
    res.status.json({ message: e.message });
  }
});

module.exports = adminOrderRouter;
