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
  port: process.env.DB_PORT,
});
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dotenv.config({ path: "./.env" });
app.set("view engine", "ejs");

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("db " + db.state);
  }
});

app.use("/", require("./routes/pages"));
// app.use("/auth", require("./routes/auth"));

app.post("/login_student", (req, res) => {
  res.send("Login successful!");
  console.log("working");
});

app.post("/auth/register", (req, res) => {
  res.send("Login successful!");
  console.log("workings");
});

app.listen(4000, () => {
  console.log("server started on port 4000");
});
