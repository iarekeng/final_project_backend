const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const User = require('../models/users.js')

users.post('/new', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({msg: "Not all fields have been entered"});
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    const existingUser = await User.findOne({username: username})
    if (existingUser)
    return res
      .status(400)
      .json({msg: "An account with this username already exists."})
    const newUser = new User({
      username,
      password: req.body.password
    })
    const savedUser = await newUser.save();
    res.json(savedUser);
})

users.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ username: username });
    if (!user)
      return res.status(400).json({ msg: "No account with has been made with this username" });

    const isMatch = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    })
})

users.delete('/delete', auth, async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.user);
  res.json(deletedUser);
})

users.post("/tokenIsValid", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) return res.json(false);

  const verified = jwt.verify(token, process.env.JWT_SECRET)
  if (!verified) return res.json(false);

  const user = await User.findById(verified.id);
  if (!user) return res.json(false);

  return res.json(true)
})

module.exports = users
