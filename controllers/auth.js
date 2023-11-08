const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../public/dbService");

const saltRounds = 10;

exports.student_signin = async (req, res) => {
  console.log(req.body);
  const {student_id, password} = req.body;

  const query = 'SELECT * FROM users WHERE student_id = ?';
  db.query(query, [student_id], (error, results) => {
    if (error) {
      res.status(500).send('error!');
    } else if (results.length === 0) {
      res.status(401).send('b');
    } else {
      bcrypt.compare(password, results[0].password, (error, result) => {
        if (error) {
          res.status(500).send('error!');
        } else if (result) {
          res.status(200).send('successful!');
        } else {
          res.status(401).send('b');
        }
      });
    }
  });
};

exports.student_register = (req, res) => {
  // res.send("form submitted");
  console.log(req.body);
  const { first_name, last_name, email, student_id, password, re_password } =
    req.body;
  const query = 'SELECT * FROM users where student_id = ?';
  db.query(query, [student_id], (error, results) => {
    if (error) {
      res.status(500).send('error');
    } else if (results.length > 0) {
      res.status(401).send('b');
    } else {
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          res.status(500).send('error');
        } else {
          db.query(
            "INSERT INTO users SET ? ",
            {
              first_name: first_name,
              last_name: last_name,
              email: email,
              student_id: student_id,
              password: hashedPassword,
              re_password: hashedPassword,
            },
            (e, r) => {
              if (e) {
                res.status(500).send('error');
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
                res.status(200).send('successful!');
              }
            }
          );
        }
      });
    }
  });
};

exports.admin_signin = async (req, res) => {
  console.log(req.body);
  const {admin_id, password} = req.body;

  const query = 'SELECT * FROM admin WHERE admin_id = ?';
  db.query(query, [admin_id], (error, results) => {
    if (error) {
      res.status(500).send('error!');
    } else if (results.length === 0) {
      res.status(401).send('b');
    } else {
      bcrypt.compare(password, results[0].password, (error, result) => {
        if (error) {
          res.status(500).send('error!');
        } else if (result) {
          res.status(200).send('successful!');
        } else {
          res.status(401).send('b');
        }
      });
    }
  });
};

exports.admin_register = (req, res) => {
  // res.send("form submitted");
  console.log(req.body);
  const { first_name, last_name, email, admin_id, password, re_password } =
    req.body;
  const query = 'SELECT * FROM admin where admin_id = ?';
  db.query(query, [admin_id], (error, results) => {
    if (error) {
      res.status(500).send('error');
    } else if (results.length > 0) {
      res.status(401).send('b');
    } else {
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          res.status(500).send('error');
        } else {
          db.query(
            "INSERT INTO admin SET ? ",
            {
              first_name: first_name,
              last_name: last_name,
              email: email,
              admin_id: admin_id,
              password: hashedPassword,
              re_password: hashedPassword,
            },
            (e, r) => {
              if (e) {
                res.status(500).send('error');
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
                res.status(200).send('successful!');
              }
            }
          );
        }
      });
    }
  });
};

exports.complain = async (req, res) => {
  console.log(req.body);
};

