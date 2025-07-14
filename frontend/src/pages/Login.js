import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login as loginApi } from '../utils/api';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (form) => {
    setLoading(true);
    setError('');
    try {
      const { token } = await loginApi(form.email, form.password);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        <AuthForm type="login" onSubmit={handleLogin} loading={loading} error={error} />
        <div className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-green-500 font-semibold hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
} 