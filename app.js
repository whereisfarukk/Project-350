const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config();


// const db = require("./public/dbService");

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dotenv.config({ path: "./.env" });
app.set("view engine", "ejs");

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

// app.post("/login_student", (req, res) => {
//   res.send("Login successful!");
//   console.log("working");
// });
// app.post("/auth/signin", (req, res) => {
//   const username = req.body.your_sid;
//   const password = req.body.your_pass;
//   console.log(username);
// });

// app.post("/auth/register", (req, res) => {
//   res.send("Login successful!");
//   console.log("workings");
// });

app.listen(4000, () => {
  console.log("server started on port 4000");
});
