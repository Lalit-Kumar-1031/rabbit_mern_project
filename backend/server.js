const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");

//Routers Imports
const userRouter = require("./routes/userRouter.js");
const productRouter = require("./routes/productRouter.js");
const cartRouter = require("./routes/cartRouter.js");
const checkoutRouter = require("./routes/checkoutRouter.js");
const orderRouter = require("./routes/orderRouter.js");
const uploadRouter = require("./routes/uploadRouter.js");
const subscriberRouter = require("./routes/subscriberRouter.js");

//Admin
const adminRouter = require("./routes/adminRouter.js");
const productAdminRouter = require("./routes/productAdminRouter.js");
const adminOrderRouter = require("./routes/adminOrderRouter.js");
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
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/subscribe", subscriberRouter);

//Admin
app.use("/api/admin/users", adminRouter);
app.use("/api/admin/products", productAdminRouter);
app.use("/api/admin/orders", adminOrderRouter);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
