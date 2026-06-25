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

checkoutRouter.post("/", protect, async (req, res) => {
  try {
    console.log("Req Body =>",req.body);
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
      req.body;
      

    if (!checkoutItems || checkoutItems.length === 0) {
      return res.status(400).json({ message: "No items in checkout" });
    }

    //create a new checkout
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });

    console.log(`Checkout Session created for the user ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (e) {
    console.log("Error in API=>",e);
    res.status(500).json({ message: e.message });
  }
});

//@route PUT /api/checkout/:id/pay
//@desc Update checkout to mark as paid after successful payment
//@access Private

checkoutRouter.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();
      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid Payment Method" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route POST /api/checkout/:id/finalize
//@desc Finalize checkout and convert to an order after payment confirmation
//@access Private
checkoutRouter.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      //mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      //delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user.toString() });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout already finalized" });
    } else {
      res.status(400).json({ message: "Checkout is not paid" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = checkoutRouter;
