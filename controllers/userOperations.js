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
exports.application = async (req, res) => {
  console.log(req.body);
  const {
    First_Name,
    Last_Name,
    DOB,
    email,
    Mobile_Number,
    gender,
    Merital_Status,
    Father_Name,
    Mother_Name,
    P_Phone_Number,
    present_Address,
    Permanent_Address,
    Nationality,
    district,
    Post_Code,
    Ward_Number,
    Student_ID,
    semester,
    Department,
    CGPA,
    Last_semester_GPA,
    Last_semester_position,
  } = req.body;
  db.query(
    "SELECT student_id FROM applications WHERE student_id = ?",
    [Student_ID],
    async (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }

      db.query(
        "INSERT INTO applications SET ? ",
        {
          first_name: First_Name,
          last_name: Last_Name,
          date_of_birth: DOB,
          email: email,
          mobile_number: Mobile_Number,
          gender: gender,
          merital_status: Merital_Status,
          father_name: Father_Name,
          mother_name: Mother_Name,
          parent_mobile_number: P_Phone_Number,
          present_address: present_Address,
          permanent_address: Permanent_Address,
          nationality: Nationality,
          district: district,
          post_code: Post_Code,
          ward_number: Ward_Number,
          student_id: Student_ID,
          semester: semester,
          department: Department,
          cgpa: CGPA,
          last_semester_gpa: Last_semester_GPA,
          last_semester_position: Last_semester_position,
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
