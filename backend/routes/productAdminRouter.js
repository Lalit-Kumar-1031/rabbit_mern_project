const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/auth");

const productAdminRouter = express.Router();

//@route GET /api/admin/products
//@desc Get all the products
//@access Private/Admin
productAdminRouter.get("/", protect, admin, async (req, res) => {
  try {
    const product = await Product.find({});
    return res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = productAdminRouter;
