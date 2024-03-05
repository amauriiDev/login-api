const express = require("express");
const User = require("../models/user");
const bcrypt =require("bcrypt")

const router = express.Router();

router.post("/register", async (req, res) => {
  const {username, email, password, passwordConfirm} = req.body;

  const alreadyExistsUsername = await User.findOne({ where: { username } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );
  const alreadyExistsEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUsername || alreadyExistsEmail) {
    return res.status(409).json({ message: "This username or email already exists!" });
  }
  if (password !== passwordConfirm) {
    return res.status(409).json({ message: "The password and confirm password must be same" });
  }

  const hashedPassword = await bcrypt.hash(password, 8)

  const newUser = new User({ username, email, password:hashedPassword });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) res.json({ message: "Thanks for registering" });
});

module.exports = router;

