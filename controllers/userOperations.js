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
};

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
};

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
          console.log('inserted viva schedule');
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
          res.status(201).send('successfully updated!');
        }
      });
    }
  });
};

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
};

