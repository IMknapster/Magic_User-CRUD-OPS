const express = require("express");
const User = require("../models/user");
const router = express.Router();

//Get all Users

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Single user

router.get("/:id", getUser, (req, res) => {
  res.send(res.user);
});

//Delete a user 

router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted Succesfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Add a user 

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a user

router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) res.user.name = req.body.name;
  if (req.body.email != null) res.user.email = req.body.email;
  if (req.body.password != null) res.user.password = req.body.password;
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// middleware
async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(401).json({ message: "Can't find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;
