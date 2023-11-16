const loginForm = document.querySelector(".signin-content");
const registrationForm = document.querySelector(".signup-content");
const createAccountLink = document.querySelector(".signup-image-link");
const alreadyMemberLink = document.querySelector(".signin-image-link");

createAccountLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  loginForm.classList.add("hidden");
  registrationForm.classList.remove("hidden");
});
alreadyMemberLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  loginForm.classList.remove("hidden");
  registrationForm.classList.add("hidden");
});
window.addEventListener("load", function () {
  // Reset the form fields when the page loads
  const loginForm = document.getElementById("login-form");
  loginForm.reset();
});

// Application form js code
