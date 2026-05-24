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

//@route GET /api/products
//@desc Get all the products with optional query filters
//access Public

productRouter.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    //Filter Logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let sort = {};

    //Sort Logic
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    //Fetch the products and apply sorting and limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit || 0));

    res.json(products);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route GET /api/products/best-seller
//@desc retrieve the products with highest rating
//@ access Public

productRouter.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (!bestSeller) {
      res.status(404).json({ message: "No Best Seller Found" });
    }
    res.json(bestSeller);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route GET /api/products/new-arrivals
//@desc Retrieved latest 8 product based on creation date
//@access Public

productRouter.get("/new-arrivals", async (req, res) => {
  try {
    //Fetch Latest 8 Products
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route GET /api/products/:id
//desc get a single product details via id
//access Public

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route GET /api/products/similar/:id
//desc get the similar products based on current product category and gender
//access Public

productRouter.get("/similar/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // fetch the product based on id
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // fetch similar product base on category and gender
    const similarProducts = await Product.find({
      _id: { $ne: id }, // exclude the current product
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = productRouter;
