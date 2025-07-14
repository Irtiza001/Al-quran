import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, BellIcon, BookOpenIcon, BookmarkIcon, SparklesIcon, AcademicCapIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const quickLinks = [
  { to: '/surahs', label: 'Quran', icon: <BookOpenIcon className="h-8 w-8" />, color: 'from-green-400 to-cyan-400' },
  { to: '/bookmarks', label: 'Bookmarks', icon: <BookmarkIcon className="h-8 w-8" />, color: 'from-pink-400 to-fuchsia-400' },
  { to: '/adzan', label: 'Adzan', icon: <BellIcon className="h-8 w-8" />, color: 'from-yellow-400 to-orange-400' },
  { to: '/duas', label: 'Duas', icon: <BookOpenIcon className="h-8 w-8" />, color: 'from-blue-400 to-indigo-400' },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  const handleContinue = () => {
    if (user?.lastRead?.surah) {
      navigate(`/surah/${user.lastRead.surah}#ayah-${user.lastRead.ayah}`);
    } else {
      navigate('/surahs');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Welcome{user?.name ? `, ${user.name}` : ''}!
          </h1>
          <div className="text-gray-600 dark:text-gray-300">
            May the Quran bring you peace and guidance.
          </div>
        </div>
      </div>

      {/* Last Read Section */}
      <div className="mb-8">
        <div className="rounded-3xl p-6 bg-gradient-to-br from-green-100 to-cyan-100 dark:from-gray-800 dark:to-gray-900 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-gray-700 dark:text-white mb-1">Last Read</div>
            {user?.lastRead?.surah ? (
              <div className="text-gray-700 dark:text-green-200">
                Surah {user.lastRead.surah}, Ayah {user.lastRead.ayah}
              </div>
            ) : (
              <div className="text-gray-400">No last read yet.</div>
            )}
          </div>
          <button
            onClick={handleContinue}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-green-400 to-cyan-400 text-white font-semibold shadow hover:from-green-500 hover:to-cyan-500 transition"
          >
            Continue Reading <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {quickLinks.map(link => (
          <button
            key={link.label}
            onClick={() => link.to !== '#' && navigate(link.to)}
            className={`flex flex-col items-center justify-center gap-2 p-6 rounded-3xl shadow bg-gradient-to-br ${link.color} text-white font-bold text-lg hover:scale-105 transition`}
            disabled={link.to === '#'}
          >
            {link.icon}
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
