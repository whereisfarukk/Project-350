const applicationForm = document.querySelector("#application_form");

applicationForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const firstName = document.querySelector('input[name="first_name"]').value;
        const lastName = document.querySelector('input[name="last_name"]').value;
        const dateOfBirth = document.querySelector('input[name="date_of_birth"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const phoneNumber = document.querySelector('input[name="phone_number"]').value;
        const studentId = document.querySelector('input[name="student_id"]').value;
        const cgpa = document.querySelector('input[name="cgpa"]').value;
        const meritPosition = document.querySelector('input[name="merit_position"]').value;
        const gender = document.querySelector('select[name="gender"]').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const bdPhoneNumberPattern = /^(?:\+?88|0088)?01[3-9]\d{8}$/;

        if (!/^[a-zA-Z]+$/.test(firstName)) {
          alert('First name must contain only letters.');
        } else if (!/^[a-zA-Z]+$/.test(lastName)) {
          alert('Last name must contain only letters.');
        } else if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
        } else if (!/^\d{10}$/.test(studentId)) {
          alert('Student ID must be a number with 10 digits.');
        } else if (cgpa < 2 || cgpa > 4) {
          alert('CGPA must be between 2 and 4.');
        } else if (meritPosition <= 0) {
          alert('Merit position must be a positive number.');
        } else if (gender !== 'Male') {
          alert('Gender must be Male.');
        } else {
          const formData = new FormData(event.target);
          const response = await fetch('/auth/application', {
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
            // alert("Already applied!");
            const errorContainer = document.querySelector('#error-message');
            errorContainer.textContent = 'Already applied!';
          } else {
            const errorContainer = document.querySelector('#error-message');
            errorContainer.textContent = 'Oops, something went wrong';
            // alert('Oops, something went wrong');
          }
        } 
    
});