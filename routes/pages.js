const express = require("express");
const router = express.Router();
const db = require("../public/dbService");

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

router.get("/complain", (req, res) => {
  res.render("complain"); // Renders the complain.ejs file
});

router.get("/userApplicationStatus", (req, res) => {
  res.render("userApplicationStatus"); // Renders the userApplicationStatus.ejs file
});

router.get("/admin_dashboard", (req, res) => {
  res.render("admin_dashboard");
});

router.get("/admin_dashboard_viewpayment", (req, res) => {
  res.render("admin_dashboard_viewpayment");
});

router.get("/assign_viva", (req, res) => {
  res.render("assign_viva");
});

router.get("/admin_dashboard_applicants", (req, res) => {
  const query = 'SELECT * FROM applications WHERE application_status = ?';
  const applicaton_status = 'pending';
  db.query(query, [applicaton_status], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else if (results.length === 0) {
      res.status(501).send('No applications to show');
    } else {
      res.render("admin_dashboard_applicants", { data: results });
    }
  });
});

router.get("/admin_dashboard_accepted_applicants", (req, res) => {
  const query = 'SELECT * FROM applications WHERE application_status = ?';
  const applicaton_status = 'accepted';
  db.query(query, [applicaton_status], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else if (results.length === 0) {
      res.status(501).send('No applications to show');
    } else {
      res.render("admin_dashboard_accepted_applicants", { data: results });
    }
  });
});

router.get("/admin_dashboard_rejected_applicants", (req, res) => {
  const query = 'SELECT * FROM applications WHERE application_status = ?';
  const applicaton_status = 'rejected';
  db.query(query, [applicaton_status], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else if (results.length === 0) {
      res.status(501).send('No applications to show');
    } else {
      res.render("admin_dashboard_rejected_applicants", { data: results });
    }
  });
});

router.get("/details", (req, res) => {
  const query = 'SELECT * FROM applications WHERE student_id = ?';
  db.query(query, [req.query.student_id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render("details", { rowData: results[0] });
    }
  });
});

module.exports = router;
