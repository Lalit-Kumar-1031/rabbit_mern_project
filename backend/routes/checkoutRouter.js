const express = require("express");
const Checkout = require("../models/Checkout");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { protect } = require("../middleware/auth");

const checkoutRouter = express.Router();

//@route PUSH /api/checkout
//@desc Create a new checkout session
//@access Private

checkoutRouter.push("/", protect, async (req, res) => {
  try {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
      req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
      return res.status(400).json({ message: "No items in checkout" });
    }
  } catch (e) {}
});
