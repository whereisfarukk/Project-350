const loginForm = document.querySelector(".signin-content");
const registrationForm = document.querySelector(".signup-content");
const createAccountLink = document.querySelector(".signup-image-link");
const alreadyMemberLink = document.querySelector(".signin-image-link");
const studentLoginForm = document.querySelector("#student-login-form");
const studentSignUpForm = document.querySelector("#student-signup-form");

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

studentLoginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('/auth/student_signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData)),  
    });
    
    if (response.status === 200) {
      window.location.href = "/dashboard";
      // response.redirect("/dashboard"); // Change the URL to your desired destination
    } else if (response.status === 401) {
      // Invalid username or password
      const errorContainer = document.querySelector('#error-message');
      errorContainer.textContent = 'Invalid username or password';
    } else {
      const errorContainer = document.querySelector('#error-message');
      errorContainer.textContent = 'Oops, something went wrong';
    }
});

studentSignUpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('/auth/student_register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData)),  
    });
    
    if (response.status === 200) {
      window.location.href = "/dashboard"; // Change the URL to your desired destination
    } else if (response.status === 401) {
      // User already exists
      const errorContainer = document.querySelector('#error-message1');
      errorContainer.textContent = 'Already signed up, sign in instead';
    } else {
      const errorContainer = document.querySelector('#error-message1');
      errorContainer.textContent = 'Oops, something went wrong';
    }
});

