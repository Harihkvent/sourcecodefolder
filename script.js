// /public/script.js

document.addEventListener('DOMContentLoaded', function () {

  // Toggle between login and register forms
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginLink = document.getElementById('login-link');
  const forgotPasswordLink = document.getElementById('forgot-password-link');

  // Switch to login form
  loginLink.addEventListener('click', function (event) {
    event.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // Handle registration
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (name && email && password) {
      // Save registered user in localStorage (this simulates a backend for now)
      localStorage.setItem('user', JSON.stringify({ name, email, password }));
      alert('Registration successful! You can now log in.');

      // Switch to login form
      registerForm.style.display = 'none';
      loginForm.style.display = 'block';
    } else {
      alert('Please fill out all fields');
    }
  });

  // Handle login
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert('Login successful!');
      // Save session (simulated)
      localStorage.setItem('isLoggedIn', 'true');

      // Redirect to the dashboard
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid email or password.');
    }
  });

  // Logout function (used in dashboard)
  const logoutButton = document.getElementById('logout-btn');
  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('isLoggedIn');
      window.location.href = 'index.html'; // Redirect to the home page
    });
  }

  // Access control for the dashboard
  if (window.location.pathname.endsWith('dashboard.html')) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      alert('You need to log in first.');
      window.location.href = 'login.html'; // Redirect to login if not authenticated
    }
  }
});
