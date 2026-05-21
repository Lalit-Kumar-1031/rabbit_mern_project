const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const userRouter = express.Router();
const protect = require("../middleware/auth");

//Register a new user
userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check all required fields are available
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name,Email and Password are required" });
    }

    //check the existence of the user before creating new one
    const isExist = await User.findOne({ email });

    //if exist give error we can not create new usr with this email
    if (isExist) {
      return res
        .status(400)
        .json({ message: "User already exist with this email" });
    }

    const user = new User({ name, email, password });
    await user.save();

    /// generate Token
    const token = user.generateToken();

    const savedUser = await User.findById(user._id).select("-password");

    return res.status(201).json({ user: savedUser, token });
  } catch (e) {
    console.log("register api exception:", e);
    res.status(500).send("Internal Server Error..");
  }
});

//login API
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password is required" });
    }

    // find the user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const savedUser = await User.findById(user._id).select("-password");

    /// generate Token
    const token = user.generateToken();
    return res.status(200).json({ user: savedUser, token });
  } catch (e) {
    console.log("login api exception:", e);
    res.status(500).send("Internal Server Error..");
  }
});

// User profile API
userRouter.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = userRouter;
