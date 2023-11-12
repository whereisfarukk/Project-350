const express = require("express");
const router = express.Router();
const db = require("../public/dbService");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login_student", (req, res) => {
  res.render("login_student", {
    errorMessage: null,
  });
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

router.get("/complain", (req, res) => {
  res.render("complain"); // Renders the complain.ejs file
});

router.get("/userApplicationStatus", (req, res) => {
  res.render("userApplicationStatus"); // Renders the userApplicationStatus.ejs file
});

router.get("/admin_dashboard", (req, res) => {
  res.render("admin_dashboard");
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

router.get("/admin_dashboard_applicants", (req, res) => {
  const query = 'SELECT * FROM applications';
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render("admin_dashboard_applicants", { data: results });
    }
  });
});

router.get("/details", (req, res) => {
  // const student_id = req.body.student_id;
  // console.log(req.body);
  const query = 'SELECT * FROM applications';
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render("details", { rowData: results[0] });
    }
  });
});

module.exports = router;
