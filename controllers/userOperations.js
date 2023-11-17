const db = require("../public/dbService");

exports.complain = async (req, res) => {
  console.log(req.body);
  const { student_id, complaint_type, message } = req.body;
  db.query(
    "SELECT student_id FROM users WHERE student_id = ?",
    [student_id],
    async (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }

      db.query(
        "INSERT INTO complaint SET ? ",
        {
          complaint_type: complaint_type,
          complaint_description: message,

          date_received: new Date().toISOString().slice(0, 10),
          date_resolved: null,
          student_id: student_id,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.redirect("/dashboard");
          }
        }
      );
    }
  );
}

exports.application = async (req, res) => {
  const query = 'SELECT * FROM applications where student_id = ?';
  db.query(query, [req.body.student_id], (error, results) => {
    if (error) {
      res.status(500).send('error');
    } else if (results.length > 0) {
      res.status(401).send('Already applied!');
    } else {
      const table = 'applications';
      // Extract column names and values from req.body
      const columns = Object.keys(req.body);
      const values = Object.values(req.body);

      // SQL query to insert data into the table
      const insertQuery = `
        INSERT INTO ${table} (${columns.join(', ')})
        VALUES (${Array(values.length).fill('?').join(', ')})
      `;
      db.query(insertQuery, values, (err, r) => {
        if (err) {
          res.status(500).send('error');
        } else {
          res.status(200).send('successful!');
        }
      });
    }
  });
}

exports.assign_viva = async (req, res) => {
  const table = 'viva';
  console.log(req.body);
  // Extract column names and values from req.body
  const columns = Object.keys(req.body);
  const values = Object.values(req.body);

  const query = 'SELECT * FROM viva WHERE student_id = ?';
  db.query(query, [req.body.student_id], (err, r) => {
    if (err) {
      res.status(500).send('error');
    } else if (r.length === 0) {
      const insertQuery = `
      INSERT INTO ${table} (${columns.join(', ')})
      VALUES (${Array(values.length).fill('?').join(', ')})
    `;
      db.query(insertQuery, values, (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send('error');
        } else {
          const updateQuery = 'UPDATE applications SET application_status = ? WHERE student_id = ?'
          db.query(updateQuery, ['selected', req.body.student_id], (e1, r1) => {
            if (e1) {
              console.log(e1);
              res.status(500).send('error');
            } else {
              res.status(200).send('successful');
            }
          });
        }
      });
    } else {
      const { student_id, viva_date, viva_time, viva_room } = req.body;
      const updateQuery = `
      UPDATE ${table}
      SET viva_date = ?,
          viva_time = ?,
          viva_room = ?
      WHERE student_id  = ?
    `;
      db.query(updateQuery, [viva_date, viva_time, viva_room, student_id], (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send('error');
        } else {
          console.log('updated viva schedule');
          const updateQuery = 'UPDATE applications SET application_status = ? WHERE student_id = ?'
          db.query(updateQuery, ['selected', req.body.student_id], (e1, r1) => {
            if (e1) {
              console.log(e1);
              res.status(500).send('error');
            } else {
              res.status(200).send('successful');
            }
          });
        }
      });
    }
  });
}

exports.assign_payment = async (req, res) => {
  const table = 'admission_fee';
  // Extract column names and values from req.body
  const columns = Object.keys(req.body);
  const values = Object.values(req.body);

  // SQL query to insert data into the table
  const insertQuery = `
    INSERT INTO ${table} (${columns.join(', ')})
    VALUES (${Array(values.length).fill('?').join(', ')})
  `;
  db.query(insertQuery, values, (err, r) => {
    if (err) {
      res.status(500).send('error');
    } else {
      const updateQuery = 'UPDATE applications SET application_status = ? WHERE student_id = ?'
      db.query(updateQuery, ['accepted', req.body.student_id], (e1, r1) => {
        if (e1) {
          console.log(e1);
          res.status(500).send('error');
        } else {
          res.status(200).send('successful');
        }
      });
    }
  });
}

exports.assign_room = async (req, res) => {
  // console.log(req.body);
  // const query = `
  // SELECT *,  amount, slip_number, date_of_payment, , application_status
  // FROM applications
  // WHERE student_id = ?
  // `
  // const query = `
  // DROP TABLE IF EXISTS temp_tb; 
  // CREATE TABLE temp_tb AS (
  //   SELECT * FROM applications WHERE student_id = ?
  // );  
  // ALTER TABLE temp_tb DROP COLUMN amount;
  // ALTER TABLE temp_tb DROP COLUMN slip_number;
  // ALTER TABLE temp_tb DROP COLUMN date_of_payment;
  // ALTER TABLE temp_tb DROP COLUMN date_applied;
  // ALTER TABLE temp_tb DROP COLUMN application_status;
  // SELECT * FROM temp_tb;
  // `
  // const query = `
  // SELECT * FROM applications
  // EXCEPT(SELECT amount, slip_number, date_of_payment, date_applied, application_status
  // FROM applications);
  // `

  const query = `
  SELECT student_id, first_name, last_name, department, semester, session, cgpa,
  merit_position, date_of_birth, email, phone_number, nationality, district, gender,
  marital_status, upazila, village, post_code, father_name, mother_name, parent_phone_number,
  parent_district, parent_upazila, parent_village, parent_post_code
  FROM applications WHERE student_id = ?
  `
  db.query(query, [req.body.student_id], (error, student_data) => {
    if (error) {
      console.log(error);
      res.status(500).send('error');
    } else {
      console.log(student_data);
      const table = 'student';
      const columns = Object.keys(student_data[0]);
      const values = Object.values(student_data[0]);
      columns.push('room_id');
      values.push(req.body.room_id);
      console.log(columns);
      console.log(values);
      const insertQuery = `
      INSERT INTO ${table} (${columns.join(', ')})
      VALUES (${Array(values.length).fill('?').join(', ')})
    `;
      db.query(insertQuery, values, (err_insert, res_insert) => {
        if (err_insert) {
          console.log(err_insert);
          res.status(500).send('error');
        } else {
          const updateQuery = 'UPDATE applications SET application_status = ? WHERE student_id = ?'
          db.query(updateQuery, ['admitted', req.body.student_id], (err_update, res_update) => {
            if (err_update) {
              console.log(err_update);
              res.status(500).send('error');
            } else {
              const payment_insert_query = `
              INSERT INTO payment
              (payslip_number, student_id, amount, payment_date, payment_type)
              VALUES (?, ?, ?, ?, ?)
              `
              const {ad_fee_slip_number, student_id, ad_fee_amount, ad_fee_payment_date} = req.body;
              const payment_type = 'admission_fee'; 
              const payment_values = [ad_fee_slip_number, student_id, ad_fee_amount, ad_fee_payment_date, payment_type];
              db.query(payment_insert_query, payment_values, (err_payment, res_payment) => {
                if (err_payment) {
                  console.log(err_payment);
                  res.status(500).send('error');
                } else {
                  res.status(200).send('successful');
                }
              });
            }
          });
        }
      });
    }
  })
}


exports.reject_application = async (req, res) => {
  const query = 'UPDATE applications SET application_status = ? WHERE student_id = ?';
  db.query(query, ['rejected', req.body.student_id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('error');
    } else {
      res.status(200).send('successful');
    }
  })
}

exports.resolve_complaint = async (req, res) => {
  console.log(req.body);
  const query = `UPDATE complaint
  SET complaint_status = ?,
  date_resolved = CURDATE()
  WHERE complaint_number = ?
  `
  db.query(query, ['resolved', req.body.complaint_number], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('error');
    } else {
      res.status(200).send('successful');
    }
  })
}

exports.delete_complaint = async (req, res) => {
  console.log(req.body);
  const query = 'DELETE FROM complaint WHERE complaint_number = ?'
  db.query(query, [req.body.complaint_number], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('error');
    } else {
      res.status(200).send('successful');
    }
  })
}

exports.delete_application = async (req, res) => {
  // console.log(req.body);
  const { student_id } = req.body;
  const feeQuery = 'DELETE FROM admission_fee WHERE student_id = ?';
  db.query(feeQuery, [student_id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('error');
    } else {
      const vivaQuery = 'DELETE FROM viva WHERE student_id = ?';
      db.query(vivaQuery, [student_id], (err_viva, res_viva) => {
        if (err_viva) {
          console.log(err_viva);
          res.status(500).send('error');
        } else {
          const applicationQuery = 'DELETE FROM applications WHERE student_id = ?';
          db.query(applicationQuery, [student_id], (err_app, res_app) => {
            if (err_app) {
              console.log(err_app);
              res.status(500).send('error');
            } else {
              res.status(200).send('successful');
            }
          })
        }
      })
    }
  })
}

exports.resolve_leave_request = async (req, res) => {
  const query = 'DELETE FROM leave_request where student_id = ?';
  db.query(query, [req.body.student_id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('error');
    } else {
      const deleteQuery = 'DELETE FROM student where student_id = ?'
      db.query(deleteQuery, [req.body.student_id], (err_del, res_del) => {
        if (err_del) {
          console.log(err_del);
          res.status(500).send('error');
        } else {
          res.status(200).send('successful');
        }
      })
    }
  })
}
