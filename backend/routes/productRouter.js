const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/auth");

const productRouter = express.Router();

//desc Create a new product
//@access Privet/Admin

productRouter.post("/", protect, admin, async (req, res) => {
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
    console.log("Server Error ==>", e);
    res.status(500).json({ message: e.message });
  }
});

//@route PUT /api/products/:id
//@desc update the existing product details
//@access Private/Admin

productRouter.put("/:id", protect, admin, async (req, res) => {
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

    // Find the product by Id
    console.log("product id =>");
    const productId = req.params.id;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //if we got the product then update
    if (product) {
      //update the product field
      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.discountPrice = discountPrice ?? product.discountPrice;
      product.countInStock = countInStock ?? product.countInStock;
      product.category = category ?? product.category;
      product.brand = brand ?? product.brand;
      product.sizes = sizes ?? product.sizes;
      product.colors = colors ?? product.colors;
      product.collections = collections ?? product.collections;
      product.material = material ?? product.material;
      product.gender = gender ?? product.gender;
      product.images = images ?? product.images;
      product.isFeatured = isFeatured ?? product.isFeatured;
      product.isPublished = isPublished ?? product.isPublished;
      product.tags = tags ?? product.tags;
      product.dimensions = dimensions ?? product.dimensions;
      product.weight = weight ?? product.weight;
      product.sku = sku ?? product.sku;

      //update the product in db
      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route Delete /api/products/:id
//@desc Delete a product
//@access Private/Admin

productRouter.delete("/:id", protect, admin, async (req, res) => {
  try {
    //before delete the product check product exist or not
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Product not fount" });
    }
  } catch (e) {
    res.json(500).json({ message: e.message });
  }
});

module.exports = productRouter;
