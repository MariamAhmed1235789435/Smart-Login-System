// Elements
const users = JSON.parse(localStorage.getItem("users")) || []; // Retrieve users
let currentPage = window.location.pathname.split("/").pop(); // Get current page

// Save user data to local storage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// Registration Function
function register() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const alertBox = document.getElementById("email-alert");

  if (users.find(user => user.email === email)) {
    alertBox.textContent = "Email already exists. Try another.";
    alertBox.classList.remove("d-none");
    return;
  }

  if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    alertBox.textContent = "Invalid email format.";
    alertBox.classList.remove("d-none");
    return;
  }

  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
    alertBox.textContent = "Password must include uppercase, lowercase, digit, and special character.";
    alertBox.classList.remove("d-none");
    return;
  }

  users.push({ email, password });
  saveUsers();

  alert("Registration successful! Redirecting to login...");
  window.location.href = "index.html";

}
// Login Function
function login() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const alertBox = document.querySelector(".alert");

  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    alertBox.textContent = "Invalid email or password.";
    alertBox.classList.remove("d-none");
    return;
  }

  sessionStorage.setItem("currentUser", JSON.stringify(user));
  alertBox.classList.add("d-none");
  alert("Login successful!");
  window.location.href = "home.html";
}

// Logout Function
function logout() {
  sessionStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Home Page Handler
if (currentPage === "home.html") {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "index.html";
  } else {
    document.getElementById("welcome-message").textContent = `Welcome, ${currentUser.email}!`;
  }
}
