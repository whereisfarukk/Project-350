const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();
const dotenv = require("dotenv");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

dotenv.config({ path: "./.env" });
app.set("view engine", "ejs");

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Connected...");
  }
});

app.get("/", (req, res) => {
  res.render("login");
});

app.listen(4000, () => {
  console.log("server started on port 4000");
});