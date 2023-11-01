const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});
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
