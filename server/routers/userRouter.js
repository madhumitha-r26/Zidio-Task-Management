const express = require("express");
const bcrypt=require('bcrypt')
const router = express.Router();
const userModel = require("../model/userModel.js");

//-------------- get all users ---------------
router.get("/", async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({
    message: "Users list retrieved successfully",
    data: users,
  });
});

//------------ get users by id -----------------
router.get("/:email", async (req, res) => {
  const email = req.params.email;
  const user = await userModel.findOne({ email: email });

  if (user) {
    res.status(200).send({
      message: "User found",
      data: user,
    });
  } else {
    res.status(404).send({
      message: "User not found",
    });
  }
});

//------------ add new user -----------------
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User with this ID already exists",
    });
  }

  const hashed_pwd= await bcrypt.hash(password,10)

  const newUser = new userModel({
    name,
    email,
    password:hashed_pwd 
  });

  await newUser.save();
  res.status(201).json({
    success: true,
    message: "User added successfully",
    data: newUser,
  });
});

//------------ delete user -----------------
router.delete("/:email", async (req, res) => {
  const email = req.params.email;
  const user = await userModel.findOne({ email: email });

  if (user) {
    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});


//------------ update user -----------------
router.put("/:email", async (req, res) => {
  const email = req.params.email;
  const { name, password} = req.body;
  const user = await userModel.findOne({ email: email });
  if (user) {
    user.name=name;
    user.password = password;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});

module.exports = router;