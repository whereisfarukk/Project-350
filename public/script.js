const { application } = require("express");

const loginForm = document.querySelector(".signin-content");
const registrationForm = document.querySelector(".signup-content");
const createAccountLink = document.querySelector(".signup-image-link");
const alreadyMemberLink = document.querySelector(".signin-image-link");
const loginLink = document.getElementById("loginButton");
const regLink = document.getElementById("regButton");

createAccountLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior

  // Toggle the visibility of the sign-in and sign-up forms
  loginForm.classList.add("hidden");
  registrationForm.classList.remove("hidden");
  // registrationForm.style.display =
  //   registrationForm.style.display === "none" ? "block" : "none";
});
alreadyMemberLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior

  // Toggle the visibility of the sign-in and sign-up forms
  loginForm.classList.remove("hidden");
  registrationForm.classList.add("hidden");
});

loginLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  window.location.href = "http://localhost:4000/dashboard";
});

regLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  window.location.href = "http://localhost:4000/dashboard";
});
