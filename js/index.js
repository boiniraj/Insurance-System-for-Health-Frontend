function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Event Listeners for Sign Up & Login buttons
document.getElementById('signupBtn').addEventListener('click', () => openModal('signupModal'));
document.getElementById('loginBtn').addEventListener('click', () => openModal('loginModal'));

function showLoader() {
    document.getElementById('loadingOverlay').style.display = 'flex';
  }
  
  // Hide the loading spinner overlay
  function hideLoader() {
    document.getElementById('loadingOverlay').style.display = 'none';
  }

// Signup function
function signup() {
let name = document.getElementById("signupName").value;
let email = document.getElementById("signupEmail").value;
let password = document.getElementById("signupPassword").value;

showLoader(); 

fetch('https://user-management-4giw.onrender.com/user-api/Register-User', {
method: 'POST',
mode: 'cors',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name, email, password })
})
.then(response => response.json())  // Ensure response is JSON
.then(result => {
console.log("Signup Response:", result); // Debugging
if (result.message && result.message.toLowerCase().includes("success")) {
    closeModal('signupModal');
    setTimeout(() => openModal('activateModal'), 500); // Open activation modal
} else {
    document.getElementById('signupError').textContent = result.message || "Signup failed!";
}
})
.catch(error => {
console.error("Signup Error:", error);
document.getElementById('signupError').textContent = "An error occurred. Please try again!";
})

.finally(() => {
    hideLoader(); // Hide the loader after the request completes (both success and error)
  });

}





// Activate User function
function activateUser() {
let email = document.getElementById('activateEmail').value;
let tempPassword = document.getElementById('tempPassword').value;
let confirmPassword = document.getElementById('confirmPassword').value;
let newPassword = document.getElementById('newPassword').value;

if (newPassword !== confirmPassword) {
document.getElementById('activateError').textContent = "Passwords do not match.";
return;
}

showLoader(); 

fetch('https://user-management-4giw.onrender.com/user-api/activate-User', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, tempPassword, confirmPassword }) // Fix: Use confirmPassword, not newPassword
})
.then(response => response.json())
.then(result => {
console.log("Activation Response:", result);

if (result.status === "success") { // Fix: Check for "status" field
    closeModal('activateModal');
    openModal('loginModal');
} else {
    document.getElementById('activateError').textContent = result.message; // Fix: Use "message", not "error"
}
})
.catch(error => {
console.error("Activation Error:", error);
document.getElementById('activateError').textContent = "An error occurred. Please try again!";
})

.finally(() => {
    hideLoader(); // Hide the loader after the request completes (both success and error)
  });

}

//login

function isUserLoggedIn() {
return localStorage.getItem('userLoggedIn') === 'true';
}

// Handle navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
link.addEventListener('click', function (event) {
if (!isUserLoggedIn() && (this.getAttribute('href') === 'About.html' || this.getAttribute('href') === 'Contact.html')) {
    event.preventDefault(); // Stop navigation
    openModal('signupModal'); // Show Sign Up modal
}
});
});

// Login function (Modify it to store login status)
function login() {
let email = document.getElementById('loginEmail').value;
let password = document.getElementById('loginPassword').value;

showLoader(); 

fetch('https://user-management-4giw.onrender.com/user-api/login-User', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password })
})
.then(response => {
if (!response.ok) {
    throw new Error('Network response was not ok'); // Handle HTTP errors
}
return response.json();
})
.then(result => {
console.log("Login Response:", result);

if (result.message && result.message.toLowerCase().includes("success")) {
    localStorage.setItem('userLoggedIn', 'true'); // Store login status
    
    if (result.token) {
        localStorage.setItem('authToken', result.token); // Store JWT token if available
    }

    closeModal('loginModal'); // Close modal
    window.location.href = "UserRegistration.html"; // Redirect to UserRegistration page
} else {
    document.getElementById('loginError').textContent = result.message || "Login failed!";
}
})
.catch(error => {
console.error("Login Error:", error);
document.getElementById('loginError').textContent = "An error occurred. Please try again!";
})

.finally(() => {
    hideLoader(); // Hide the loader after the request completes (both success and error)
  });
}

// Function to log out user
function logout() {
localStorage.removeItem('userLoggedIn'); // Clear login status
location.reload(); // Refresh page
}

// Check login status on page load and update UI
document.addEventListener("DOMContentLoaded", function () {
if (isUserLoggedIn()) {
document.querySelector('.buttons').innerHTML = '<button onclick="logout()">Logout</button>';
}
});
