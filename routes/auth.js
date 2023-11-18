const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const operationsController = require("../controllers/userOperations");

// student registration and signup process
router.post("/student_register", authController.student_register);
router.post("/student_signin", authController.student_signin);

//admin registration and signup process
router.post("/admin_register", authController.admin_register);
router.post("/admin_signin", authController.admin_signin);

router.post("/complain", operationsController.complain);

router.post("/application", operationsController.application);
router.post("/assign_viva", operationsController.assign_viva);
router.post("/assign_payment", operationsController.assign_payment);
router.post("/assign_room", operationsController.assign_room);
router.post("/reject_application", operationsController.reject_application);
router.post("/delete_application", operationsController.delete_application);

router.post("/resolve_complaint", operationsController.resolve_complaint);
router.post("/delete_complaint", operationsController.delete_complaint);

router.post("/resolve_leave_request", operationsController.resolve_leave_request);

router.post("/add_payment", operationsController.add_payment);

module.exports = router;
