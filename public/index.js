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

const form = document.querySelector("form"),
  nextBtn = form.querySelector(".nextBtn"),
  backBtn = form.querySelector(".backBtn"),
  allInput = form.querySelectorAll(".first input");

nextBtn.addEventListener("click", () => {
  allInput.forEach((input) => {
    if (input.value != "") {
      form.classList.add("secActive");
    } else {
      form.classList.remove("secActive");
    }
  });
});

backBtn.addEventListener("click", () => form.classList.remove("secActive"));

const districtNames = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barisal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chapainawabganj",
  "Chittagong (Chattogram)",
  "Chuadanga",
  "Comilla (Cumilla)",
  "Cox's Bazar",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore (Jessore)",
  "Jhalokati",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachari",
  "Khulna",
  "Kishoreganj",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
  "Narail",
];

const inputField = document.getElementById("district");
const suggestionsDiv = document.getElementById("suggestions");

inputField.addEventListener("input", showSuggestions);

function showSuggestions() {
  const inputValue = inputField.value.toLowerCase(); // Get the input value in lowercase

  // Clear previous suggestions
  suggestionsDiv.innerHTML = "";

  if (!inputValue) {
    // If the input is empty, hide the suggestions
    suggestionsDiv.style.display = "none";
    return;
  }

  // Filter district names that start with the input value
  const matchingDistricts = districtNames.filter((district) =>
    district.toLowerCase().startsWith(inputValue)
  );

  // Display matching suggestions
  matchingDistricts.forEach((district) => {
    const suggestion = document.createElement("div");
    suggestion.textContent = district;
    suggestion.className = "suggestion";
    suggestion.addEventListener("click", () => {
      inputField.value = district;
      suggestionsDiv.style.display = "none";
    });
    suggestionsDiv.appendChild(suggestion);
  });

  // Show suggestions div if there are matching districts
  if (matchingDistricts.length > 0) {
    suggestionsDiv.style.display = "block";
  } else {
    suggestionsDiv.style.display = "none";
  }
}

// Close suggestions when clicking outside the input field
document.addEventListener("click", (e) => {
  if (e.target !== inputField) {
    suggestionsDiv.style.display = "none";
  }
});
