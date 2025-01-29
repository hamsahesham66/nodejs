// Handle Signup Form Submission
document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    const response = await fetch('http://localhost:4000/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Registration successful! Please log in.');
      window.location.href = 'login.html'; // Redirect to login page
    } else {
      document.getElementById('signup-error').textContent = `Error: ${data.message}`;
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('signup-error').textContent = 'An error occurred. Please try again.';
  }
});