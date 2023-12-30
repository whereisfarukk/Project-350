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
router.get("/navbar", (req, res) => {
  res.render("navbar");
});
router.get("/login_admin", (req, res) => {
  res.render("login_admin");
});

router.get("/application", (req, res) => {
  res.render("application");
});

router.get("/dashboard", (req, res) => {
  console.log(req.body, req.query);
  res.render("dashboard", { student_id : req.query.student_id });
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
  const query = `
  SELECT * FROM applications
  WHERE application_status = ?
  ORDER BY cgpa DESC, merit_position ASC , date_applied ASC
  `;
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
  const query = 'SELECT * FROM room WHERE capacity - occupancy_status > 0';
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render("room_details", { data: results });
    }
  });
});

router.get("/payment", (req, res) => {
  const query = 'SELECT * FROM payment';
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render("payment", { data: results });
    }
  });
});


router.get("/complaints_details", (req, res) => {
  const query = 'SELECT * FROM complaint ORDER BY complaint_status';
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render("complaints_details", { data: results });
    }
  });
});

router.get("/leave_requests", (req, res) => {
  const query = 'SELECT * FROM leave_request ORDER BY leave_date';
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render("leave_requests", { data: results });
    }
  });
});

router.get("/application_status", (req, res) => {
  const student_id = req.query.student_id;
  console.log("appliation_status", student_id);
  // const query = `
  // SELECT 
  //   applications.student_id AS student_id,
  //   applications.application_status AS application_status,
  //   viva.viva_date AS viva_date,
  //   viva.viva_time AS viva_time,
  //   viva.viva_room AS viva_room,
  //   admission_fee.ad_fee_amount AS admission_fee_amount,
  //   admission_fee.ad_fee_payment_date AS last_date_of_payment
  //   FROM applications
  //   LEFT JOIN viva ON applications.student_id = viva.student_id
  //   LEFT JOIN admission_fee ON applications.student_id = admission_fee.student_id
  //   WHERE applications.student_id = ?;

  // `
  // const query = `
  //   SELECT student_id, application_status FROM applications WHERE student_id = ?;
  //   SELECT * FROM viva WHERE student_id = ?;
  //   SELECT * FROM admission_fee student_id = ?;
  // `
  const appQuery = 'SELECT student_id, application_status FROM applications WHERE student_id = ?';

  db.query(appQuery, [student_id], (err_app, res_app) => {
    if (err_app) {
      console.log(err_app);
      res.status(500).send('error');
    } else {
      const vivaQuery = 'SELECT * FROM viva WHERE student_id = ?'
      db.query(vivaQuery, [student_id], (err_viva, res_viva) => {
        if (err_viva) {
          console.log(err_viva);
          res.status(500).send('error');
        } else {
          const adFeeQuery = 'SELECT * FROM admission_fee WHERE student_id = ?';
          db.query(adFeeQuery, [student_id], (err_ad, res_ad) => {
            if (err_ad) {
              console.log( err_ad);
              res.status(500).send('error');
            } else {
              console.log(res_app);
              console.log(res_viva);
              console.log(res_ad);
              res.status(200).render("application_status", {r1 : res_app[0], r2 : res_viva[0], r3: res_ad[0] })
            }
          })
        }
      })
    }
  })
});

module.exports = router;
