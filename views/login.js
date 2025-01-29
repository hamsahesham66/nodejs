// Handle Login Form Submission
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Login successful!');
      localStorage.setItem('token', data.token);
      window.location.href = 'index.html'; // Redirect to category page
    } else {
      document.getElementById('login-error').textContent = `Error: ${data.message}`;
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('login-error').textContent = 'An error occurred. Please try again.';
  }
});