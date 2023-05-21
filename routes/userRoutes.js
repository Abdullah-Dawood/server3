const express = require("express");
const {
  userLogin,
  userSignup,
  checkProfile,
} = require("../controller/userController");

const router = express.Router();

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.get("/profile", checkProfile);

module.exports = router;
