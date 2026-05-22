const express = require("express");
const Product = require("../models/Product");
const protect = require("../middleware/auth");

const productRouter = express.Router();

//desc Create a new product
//@access Privet/Admin

productRouter.post("", protect, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, // reference to the admin user who create this product
    });

    // save the product
    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
  } catch (e) {
    res.status(500).send("Server Error");
  }
});

module.exports = productRouter;
