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

app.listen(4000, () => {
  console.log("server started on port 4000");
});
