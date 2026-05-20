const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const userRouter = express.Router();

//Register a new user
userRouter.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  try {
  } catch (e) {}
});

module.exports = userRouter;
