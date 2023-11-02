const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const operationsController = require("../controllers/userOperations");

// student registration and signup process
router.post("/student_register", authController.student_register);
// router.post("/register", (req, res) => {
//   // res.send("submitted");
//   console.log("working");
// });
router.post("/student_signin", authController.student_signin);

//admin registration and signup process
router.post("/admin_register", authController.admin_register);
router.post("/admin_signin", authController.admin_signin);

router.post("/complain", operationsController.complain);

router.post("/application", operationsController.application);

module.exports = router;
