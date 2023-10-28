const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// router.post("/register", authController.register);
router.post("/register", (req, res) => {
  // res.send("submitted");
  console.log("working");
});
router.post("/signin", authController.signin);
module.exports = router;
