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
        }
      );
    }
  });
};

exports.assign_viva = async (req, res) => {
  const table = 'viva';
  // Extract column names and values from req.body
  const columns = Object.keys(req.body);
  const values = Object.values(req.body);

  // SQL query to insert data into the table
  const insertQuery = `
    INSERT INTO ${table} (${columns.join(', ')})
    VALUES (${Array(values.length).fill('?').join(', ')})
  `;
   db.query(insertQuery, values, (error, results) => {
      if (error) {
        res.status(500).send('error');
      } else {
        res.status(200).send('successful!');
      }
    }
  );
};
