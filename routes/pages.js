const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login_student", (req, res) => {
  res.render("login_student");
});

router.get("/login_admin", (req, res) => {
  res.render("login_admin");
});

router.get("/application", (req, res) => {
  res.render("application");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/admin_dashboard", (req, res) => {
  res.render("admin_dashboard");
});
router.get("/admin_dashboard_applicants", (req, res) => {
  res.render("admin_dashboard_applicants");
});
router.get("/admin_dashboard_rejected_applicants", (req, res) => {
  res.render("admin_dashboard_rejected_applicants");
});
router.get("/admin_dashboard_accepted_applicants", (req, res) => {
  res.render("admin_dashboard_accepted_applicants");
});
router.get("/admin_dashboard_viewpayment", (req, res) => {
  res.render("admin_dashboard_viewpayment");
});

module.exports = router;
