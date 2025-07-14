import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register as registerApi } from '../utils/api';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (form) => {
    setLoading(true);
    setError('');
    try {
      const { token } = await registerApi(form.name, form.email, form.password);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        <AuthForm type="register" onSubmit={handleRegister} loading={loading} error={error} />
        <div className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-green-500 font-semibold hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
} 