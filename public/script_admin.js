const adminLoginForm = document.querySelector("#admin-login-form");
const adminSignUpForm = document.querySelector("#admin-signup-form");

adminLoginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('/auth/admin_signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData)),  
    });
    
    if (response.status === 200) {
      window.location.href = "/admin_dashboard";
      // response.redirect("/dashboard"); // Change the URL to your desired destination
    } else if (response.status === 401) {
      // Invalid username or password
      const errorContainer = document.querySelector('#error-message-admin');
      errorContainer.textContent = 'Invalid username or password';
    } else {
      const errorContainer = document.querySelector('#error-message-admin');
      errorContainer.textContent = 'Oops, something went wrong';
    }
});

adminSignUpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const firstName = document.querySelector('input[name="first_name"]').value;
  const lastName = document.querySelector('input[name="last_name"]').value;
  const email = document.querySelector('input[name="email"]').value;

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
  } else if (password !== repeatPassword) {
    alert('Passwords do not match');
  } else {
      const formData = new FormData(event.target);
      const response = await fetch('/auth/admin_register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData)),  
      });
      
      if (response.status === 200) {
        window.location.href = "/admin_dashboard"; // Change the URL to your desired destination
      } else if (response.status === 401) {
        // User already exists
        const errorContainer = document.querySelector('#error-message-admin1');
        errorContainer.textContent = 'Already signed up, sign in instead';
      } else {
        const errorContainer = document.querySelector('#error-message-admin1');
        errorContainer.textContent = 'Oops, something went wrong';
      }
    }
  });