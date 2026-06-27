const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/auth");

const adminRouter = express.Router();

//@route GET /api/admin/users
//@desc Get all the users (Admin Only)
//@access Private/Admin

adminRouter.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route POST /api/admin/users
//@desc Add a new user (Admin Only)
//@access Private/Admin

adminRouter.post("/", protect, admin, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    // if not exist create new user
    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });

    await user.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route PUT /api/admin/users/:id
//@desc Update the User Info (Admin Only) - Name, Email,Role
//@access Private/Admin

adminRouter.put("/:id", protect, admin, async (req, res) => {
  try {
    const { name, email, role } = req.body;

    let user = await User.findById(req.params.id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;

      const updateUser = await user.save();
      res.status(200).json(updateUser);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//@route DELETE /api/admin/users/:id
//@desc Delete a User
//@access Private/Admin

adminRouter.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.status(200).json({ message: "User Deleted Successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = adminRouter;
