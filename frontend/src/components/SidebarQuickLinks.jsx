import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const links = [
  { to: '/surahs', label: 'Quran', icon: <BookOpenIcon className="h-6 w-6" /> },
  { to: '/bookmarks', label: 'Bookmarks', icon: <BookmarkIcon className="h-6 w-6" /> },
];

export default function SidebarQuickLinks() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      {links.map(link => (
        <Link
          key={link.to}
          to={link.to}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-green-400 to-cyan-400 text-white font-semibold shadow hover:from-green-500 hover:to-cyan-500 transition"
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
} 