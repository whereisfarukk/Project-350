const express = require("express");
const router = express.Router();
const db = require("../public/dbService");
const { assign_viva } = require("../controllers/userOperations");

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
  res.render("assign_viva", {data: req.query});
});

router.get("/assign_payment", (req, res) => {
  res.render("assign_payment", {data: req.query});
});

router.get("/assign_room", (req, res) => {
  const query = 'SELECT * FROM room WHERE occupancy_status < ?';
  db.query(query, [4], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      // const combinedData = {
      //   queryParameters: req.query,
      //   fetchedData: results // Assuming 'results' holds the fetched data
      // };
      const data = results;
      const student_id = req.query.student_id;
      res.render("assign_room", { data, student_id });
    }
  });
});

router.get("/admin_dashboard_applicants", (req, res) => {
  const query = 'SELECT * FROM applications WHERE application_status = ?';
  const applicaton_status = 'pending';
  db.query(query, [applicaton_status], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render("admin_dashboard_applicants", { data: results });
    }
  });
});

router.get("/admin_dashboard_selected_applicants", (req, res) => {
  const query = `
    SELECT applications.student_id, applications.first_name, applications.last_name, applications.application_status,
    viva.viva_date, viva.viva_time, viva.viva_room
    FROM applications
    INNER JOIN viva ON applications.student_id = viva.student_id
    WHERE applications.application_status = ?
    ORDER BY viva.viva_date, viva.viva_time
  `;
  const applicaton_status = 'selected';
  db.query(query, [applicaton_status], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render("admin_dashboard_selected_applicants", { data: results });
    }
  });
});

router.get("/admin_dashboard_accepted_applicants", (req, res) => {
  const query = `
    SELECT applications.student_id, applications.first_name, applications.last_name, applications.application_status,
    admission_fee.ad_fee_payment_date, admission_fee.ad_fee_amount
    FROM applications
    INNER JOIN admission_fee ON applications.student_id = admission_fee.student_id
    WHERE applications.application_status = ?
    ORDER BY admission_fee.ad_fee_payment_date
  `;
  const applicaton_status = 'accepted';
  db.query(query, [applicaton_status], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
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
    } else {
      res.render("admin_dashboard_rejected_applicants", { data: results });
    }
  });
});

router.get("/admin_dashboard_admitted_applicants", (req, res) => {
  const query = 'SELECT * FROM applications WHERE application_status = ?';
  const applicaton_status = 'admitted';
  db.query(query, [applicaton_status], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render("admin_dashboard_admitted_applicants", { data: results });
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

router.get("/room_details", (req, res) => {
  const query = 'SELECT * FROM room WHERE occupancy_status < ?';
  db.query(query, [4], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render("room_details", { data: results });
    }
  });
});

module.exports = router;
