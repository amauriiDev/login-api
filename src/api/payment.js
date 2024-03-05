const express = require("express");
const passport = require("../auth/passport");


const router = express.Router();

// const jwt = (req, res, next) => {
//   const authToken = req.cookies["auth"]
//   next()
// }

router.get(
  "/payment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("You have a total of: 2400$");
  }
);

module.exports = router;
