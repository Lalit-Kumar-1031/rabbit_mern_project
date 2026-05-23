const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");

// connect the MongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed data
const seedData = async () => {
  try {
    // connect the MongoDB
    mongoose.connect(process.env.MONGO_URI);

    // clear the existing data
    await Product.deleteMany();
    await User.deleteMany();

    // create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    //Assign the default user id to each product
    const userId = createdUser._id;

    const sampleProduct = products.map((product) => {
      return { ...product, user: userId };
    });

    // now insert all the products in db
    await Product.insertMany(sampleProduct);

    console.log("Product Data seeded successfully..");
    process.exit();
  } catch (e) {
    console.error("Error in seeding data", e.message);
    process.exit(1);
  }
};

seedData();
