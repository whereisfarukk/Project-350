const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({ path: "./.env" });
app.set("view engine", "ejs");

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('db ' + db.state);
  }
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login_student", (req, res) => {
  res.render("login_student");
});

app.get("/login_admin", (req, res) => {
  res.render("login_admin");
});

app.get("/application", (req, res) => {
  res.render("application");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.post('/login_student', (req, res) => {
  // Redirect or send a response based on your application's logic
  res.send('Login successful!');
});

app.listen(4000, () => {
  console.log("server started on port 4000");
});


