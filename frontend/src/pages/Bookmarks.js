import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookmarks, removeBookmark } from '../utils/api';
import { BookmarkIcon, TrashIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getBookmarks()
      .then(data => setBookmarks(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (surah, ayah) => {
    if (!window.confirm('Remove this bookmark?')) return;
    try {
      await removeBookmark(surah, ayah);
      setBookmarks(bm => bm.filter(b => !(b.surah === surah && b.ayah === ayah)));
    } catch (e) {
      alert('Failed to remove bookmark');
    }
  };

  const handleGo = (surah, ayah) => {
    navigate(`/surah/${surah}#ayah-${ayah}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Bookmarks</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading bookmarks...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : bookmarks.length === 0 ? (
        <div className="text-center text-gray-400">No bookmarks yet.</div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((bm, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 shadow group">
              <BookmarkIcon className="h-6 w-6 text-green-400" />
              <div className="flex-1">
                <div className="font-semibold text-gray-700 dark:text-white">Surah {bm.surah}, Ayah {bm.ayah}</div>
                {bm.note && <div className="text-sm text-gray-500">{bm.note}</div>}
              </div>
              <button onClick={() => handleGo(bm.surah, bm.ayah)} className="p-2 rounded-xl bg-gradient-to-r from-green-400 to-cyan-400 text-white hover:from-green-500 hover:to-cyan-500 transition flex items-center gap-1">
                <BookOpenIcon className="h-5 w-5" /> Go
              </button>
              <button onClick={() => handleRemove(bm.surah, bm.ayah)} className="p-2 rounded-xl bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 