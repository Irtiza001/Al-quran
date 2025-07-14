import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PlayIcon, PauseIcon, BookmarkIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { addBookmark, updateLastRead } from '../utils/api';

export default function SurahReader() {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [audioAyah, setAudioAyah] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(0);
  const audioRef = useRef();

  // Fetch Surah data (Arabic + audio)
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`).then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${id}/en.asad`).then(r => r.json()),
    ]).then(([ar, en]) => {
      setSurah(ar.data);
      setTranslation(en.data);
      setLoading(false);
    });
  }, [id]);

  // Play/pause audio
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [isPlaying, audioAyah]);

  const handlePlay = (ayahIdx) => {
    setAudioAyah(ayahIdx);
    setCurrentAyah(ayahIdx);
    setIsPlaying(true);
    handleLastRead(ayahIdx);
  };

  const handlePause = () => setIsPlaying(false);

  const handleNext = () => {
    if (audioAyah < surah.ayahs.length - 1) {
      setAudioAyah(audioAyah + 1);
      setCurrentAyah(audioAyah + 1);
      setIsPlaying(true);
      handleLastRead(audioAyah + 1);
    }
  };

  const handlePrev = () => {
    if (audioAyah > 0) {
      setAudioAyah(audioAyah - 1);
      setCurrentAyah(audioAyah - 1);
      setIsPlaying(true);
      handleLastRead(audioAyah - 1);
    }
  };

  const handleBookmark = async (ayahIdx) => {
    try {
      await addBookmark(surah.number, surah.ayahs[ayahIdx].numberInSurah);
      alert('Bookmarked!');
    } catch (e) {
      alert('Bookmark failed');
    }
  };

  const handleLastRead = async (ayahIdx) => {
    try {
      await updateLastRead(surah.number, surah.ayahs[ayahIdx].numberInSurah);
    } catch (e) {}
  };

  if (loading || !surah || !translation) return <div className="text-center py-10">Loading surah...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">{surah.englishName} <span className="text-lg text-gray-500">({surah.name})</span></h1>
        <div className="text-gray-500 mb-2">{surah.englishNameTranslation} • {surah.numberOfAyahs} Ayahs</div>
        <div className="italic text-green-600 dark:text-green-300">{surah.revelationType}</div>
      </div>
      <div className="space-y-8">
        {surah.ayahs.map((ayah, i) => (
          <div key={ayah.number} className={`rounded-3xl p-6 shadow bg-white/80 dark:bg-gray-900/80 relative group transition ${currentAyah === i ? 'ring-2 ring-green-400' : ''}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-cyan-400 text-white font-bold shadow">{ayah.numberInSurah}</span>
                <button onClick={() => handleBookmark(i)} title="Bookmark" className="ml-2 text-green-400 hover:text-green-600"><BookmarkIcon className="h-6 w-6" /></button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handlePrev} disabled={i === 0} className="p-1 disabled:opacity-30"><ArrowLeftIcon className="h-5 w-5" /></button>
                {audioAyah === i && isPlaying ? (
                  <button onClick={handlePause} className="p-2 bg-green-100 dark:bg-green-900 rounded-full"><PauseIcon className="h-6 w-6 text-green-500" /></button>
                ) : (
                  <button onClick={() => handlePlay(i)} className="p-2 bg-green-100 dark:bg-green-900 rounded-full"><PlayIcon className="h-6 w-6 text-green-500" /></button>
                )}
                <button onClick={handleNext} disabled={i === surah.ayahs.length - 1} className="p-1 disabled:opacity-30"><ArrowRightIcon className="h-5 w-5" /></button>
              </div>
            </div>
            <div className="text-3xl font-arabic text-right mb-2 text-gray-800 dark:text-green-200 leading-loose">{ayah.text}</div>
            <div className="text-gray-600 dark:text-gray-300 mb-2">{translation.ayahs[i]?.text}</div>
            {audioAyah === i && (
              <audio
                ref={audioRef}
                src={ayah.audio}
                autoPlay
                onEnded={handleNext}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                className="w-full mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 