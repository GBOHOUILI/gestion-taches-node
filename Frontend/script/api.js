const API_BASE_URL = 'http://localhost:3000/api';

async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

async function fetchProjects() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}