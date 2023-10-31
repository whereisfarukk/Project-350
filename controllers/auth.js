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

exports.signin = async (req, res) => {
  // console.log(req.body);
  const s_id = req.body.your_sid;
  const password = req.body.password;
  console.log(s_id, password);
  if (!s_id || !password) {
    return res.render("login", {
      message: "You need to provide both email and password.",
    });
  }

  db.query(
    "SELECT * FROM users WHERE student_id = ?",
    [s_id],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (
        !results ||
        results.length === 0 ||
        !(await bcrypt.compare(password, results[0].password))
      ) {
        // res.render("login", {
        //   message: "The email or its password is incorrect",
        // });

        res.render("login_student", {
          errorMessage: "Wrong user ID or password",
        });
      } else {
        // const userId = results[0].s_id;
        // const username = results[0].name;
        // console.log(username);
        // console.log(userId);
        // return res.status(200).json({ userId, username });
        console.log("found user");
        res.redirect("/dashboard");
      }
    }
  );
};

exports.register = (req, res) => {
  // res.send("form submitted");
  // console.log(req.body);
  const { first_name, last_name, email, student_id, password, re_password } =
    req.body;
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }

      if (results.length > 0) {
        return res.render("register", {
          message: "That email is laready in use",
        });
      } else if (password !== re_password) {
        console.log("working");
        return res.render("register", {
          message: "password did not match",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO users SET ? ",
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          student_id: student_id,
          password: hashedPassword,
          re_password: re_password,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            // try {
            //   const token = jwt.sign({ email: results[0].email}, 'dhsjf3423jhsdf3423df', { expiresIn: '5d' });
            //   console.log(token);
            // } catch (error) {
            //   console.log(error);
            //   // Handle the error appropriately
            // }
            // console.log(results);
            // return res.render("login_student.ejs", {
            //   // message: "user registered",
            // });
            res.redirect("/login_student");
          }
        }
      );
    }
  );
};
// exports.signin = (req, res) => {
//   res.send("form submitted");
//   console.log("working");
//   console.log(req.body);
// };
