import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BookOpenIcon, BookmarkIcon, MoonIcon, SunIcon, ArrowLeftOnRectangleIcon, UserIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { updateThemePreference } from '../utils/api';

const navLinks = [
  { to: '/', label: 'Dashboard', icon: <BookOpenIcon className="h-6 w-6" /> },
  { to: '/bookmarks', label: 'Bookmarks', icon: <BookmarkIcon className="h-6 w-6" /> },
  { to: '/profile', label: 'Profile', icon: <UserIcon className="h-6 w-6" /> },
];

export default function MainLayout({ children }) {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  // Load theme from localStorage or backend
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setDark(stored === 'dark');
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      // Optionally, fetch from backend user profile
      // (Assume backend returns preferences.theme)
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(res => res.json())
          .then(data => {
            if (data.preferences?.theme) {
              setDark(data.preferences.theme === 'dark');
              document.documentElement.classList.toggle('dark', data.preferences.theme === 'dark');
              localStorage.setItem('theme', data.preferences.theme);
            }
          });
      }
    }
  }, []);

  // Save theme to localStorage and backend
  const handleThemeToggle = () => {
    const newTheme = !dark ? 'dark' : 'light';
    setDark(!dark);
    document.documentElement.classList.toggle('dark', !dark);
    localStorage.setItem('theme', newTheme);
    // Save to backend
    updateThemePreference(newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-100 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white/80 dark:bg-gray-900/80 shadow-lg flex flex-col items-center py-8 px-2 md:px-6 rounded-r-3xl m-2">
        <div className="mb-10 flex flex-col items-center">
          <BookOpenIcon className="h-10 w-10 text-green-500" />
          <span className="mt-2 font-bold text-lg text-gray-700 dark:text-white">myQuran</span>
        </div>
        <nav className="flex-1 w-full">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 my-2 rounded-xl font-medium transition-all ${isActive ? 'bg-gradient-to-r from-green-400 to-cyan-400 text-white shadow' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`
              }
            >
              {link.icon}
              <span className="hidden md:inline">{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-4 items-center w-full">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-green-200 dark:hover:bg-green-600 transition"
            aria-label="Toggle theme"
          >
            {dark ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-gray-600" />}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10">
        {children || <Outlet />}
      </main>
    </div>
  );
} 