import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SurahList() {
  const [surahs, setSurahs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.data);
        setLoading(false);
      });
  }, []);

  const filtered = surahs.filter(s =>
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.name.includes(search) ||
    s.number.toString() === search
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Surah List</h1>
      <div className="mb-6 flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, number, or Arabic..."
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Loading surahs...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(surah => (
            <button
              key={surah.number}
              onClick={() => navigate(`/surah/${surah.number}`)}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 shadow hover:shadow-lg transition group w-full text-left"
            >
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 flex items-center justify-center text-white text-xl font-bold shadow">
                {surah.number}
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg text-gray-700 dark:text-white group-hover:text-green-500 transition">{surah.englishName}</div>
                <div className="text-sm text-gray-500 dark:text-gray-300">{surah.englishNameTranslation}</div>
              </div>
              <div className="text-2xl font-arabic text-gray-700 dark:text-green-300 ml-2">{surah.name}</div>
              <BookOpenIcon className="h-6 w-6 text-green-400 ml-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 