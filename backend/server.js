const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");

//Routers Imports
const userRouter = require("./routes/userRouter.js");
const productRouter=require("./routes/productRouter.js")
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Connected the MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Rabbit");
});

//API Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
