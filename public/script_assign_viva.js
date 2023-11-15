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
      window.location.href = "/admin_dashboard_applicants"; // Change the URL to your desired destination
    } else {
      alert('Oops, something went wrong');
    }
});