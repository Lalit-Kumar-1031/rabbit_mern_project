const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const User = require("../models/User");

const protect = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      let token = authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (e) {
      console.log("Token verification failed");
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "Token not provided" });
  }
};

module.exports = protect;
