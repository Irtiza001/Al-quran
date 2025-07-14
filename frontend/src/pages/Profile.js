import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setForm({ name: data.name, email: data.email, password: '' });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Update failed');
      setSuccess('Profile updated!');
      setForm(f => ({ ...f, password: '' }));
    } catch (e) {
      setError('Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Profile Settings</h1>
      <form onSubmit={handleSave} className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl p-8">
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white" />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">New Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white" />
          <div className="text-xs text-gray-400 mt-1">Leave blank to keep current password.</div>
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}
        <button type="submit" className="w-full py-2 rounded-xl bg-gradient-to-r from-green-400 to-cyan-400 text-white font-bold text-lg shadow-md hover:from-green-500 hover:to-cyan-500 transition disabled:opacity-60" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  );
} 