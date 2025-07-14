import React, { useState } from 'react';
import { LockClosedIcon, UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function AuthForm({ type = 'login', onSubmit, loading, error }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [touched, setTouched] = useState({});

  const isRegister = type === 'register';

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = e => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validate = () => {
    const errs = {};
    if (isRegister && !form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const errors = validate();

  const handleSubmit = e => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      onSubmit(form);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full mx-auto bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl p-8 mt-16"
    >
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
        {isRegister ? 'Create Account' : 'Welcome Back'}
      </h2>
      {isRegister && (
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Name</label>
          <div className="relative">
            <UserIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              name="name"
              autoComplete="name"
              className={`pl-10 pr-3 py-2 w-full rounded-xl border ${errors.name && touched.name ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white`}
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
            />
          </div>
          {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Email</label>
        <div className="relative">
          <EnvelopeIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="email"
            name="email"
            autoComplete="email"
            className={`pl-10 pr-3 py-2 w-full rounded-xl border ${errors.email && touched.email ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white`}
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
          />
        </div>
        {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Password</label>
        <div className="relative">
          <LockClosedIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="password"
            name="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            className={`pl-10 pr-3 py-2 w-full rounded-xl border ${errors.password && touched.password ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white`}
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
          />
        </div>
        {errors.password && touched.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 rounded-xl bg-gradient-to-r from-green-400 to-cyan-400 text-white font-bold text-lg shadow-md hover:from-green-500 hover:to-cyan-500 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
      </button>
    </form>
  );
} 