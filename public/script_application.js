const applicationForm = document.querySelector("#application_form");

applicationForm.addEventListener('submit', async (event) => {
  event.preventDefault();
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
});