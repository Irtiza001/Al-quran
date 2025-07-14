const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
}

export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
}

export async function addBookmark(surah, ayah) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/user/bookmark`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ surah, ayah }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Bookmark failed');
  return data;
}

export async function updateLastRead(surah, ayah) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/user/lastread`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ surah, ayah }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Update last read failed');
  return data;
}

export async function getBookmarks() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch bookmarks');
  return data.bookmarks || [];
}

export async function removeBookmark(surah, ayah) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/user/bookmark`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ surah, ayah }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to remove bookmark');
  return data;
}

export async function updateThemePreference(theme) {
  const token = localStorage.getItem('token');
  if (!token) return;
  await fetch(`${API_URL}/user/preferences`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ theme }),
  });
} 