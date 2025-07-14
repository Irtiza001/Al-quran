import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <ExclamationTriangleIcon className="h-20 w-20 text-yellow-400 mb-4" />
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">404 - Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Sorry, the page you are looking for does not exist.</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-400 to-cyan-400 text-white font-semibold shadow hover:from-green-500 hover:to-cyan-500 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
} 