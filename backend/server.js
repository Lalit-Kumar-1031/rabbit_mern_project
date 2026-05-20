const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const userRouter = require("./routes/userRouter.js");

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

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
