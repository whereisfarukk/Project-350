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
  
  try {
    const response = await fetch('/auth/student_signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (response.ok) {
      const data = await response.json();
      const studentId = data.student_id;
      window.location.href = `/dashboard?student_id=${studentId}`;
      // window.location.href = "/dashboard";
    } else if (response.status === 401) {
      // Invalid username or password
      const errorContainer = document.querySelector('#error-message');
      errorContainer.textContent = 'Invalid username or password';
    } else {
      const errorContainer = document.querySelector('#error-message');
      errorContainer.textContent = 'Oops, something went wrong';
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

studentSignUpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const firstName = document.querySelector('input[name="first_name"]').value;
  const lastName = document.querySelector('input[name="last_name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const studentIdArray = document.querySelectorAll('input[name="student_id"]');
  const studentId = studentIdArray[1].value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordArray = document.querySelectorAll('input[name="password"]');
  const password = passwordArray[1].value;
  const repeatPassword = document.getElementById('re_pass');

  // Check if passwords match
 if (!/^[a-zA-Z]+$/.test(firstName)) {
    alert('First name must contain only letters.');
  } else if (!/^[a-zA-Z]+$/.test(lastName)) {
    alert('Last name must contain only letters.');
  } else if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
  } else if (!/^\d{10}$/.test(studentId)) {
    alert('Student ID must be of 10 digits');
  } else if (password !== repeatPassword) {
    alert('Passwords do not match');
  } else {
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
  }
});

