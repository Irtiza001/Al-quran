import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import SurahReader from './pages/SurahReader';
import Bookmarks from './pages/Bookmarks';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import SurahList from './pages/SurahList';
import Profile from './pages/Profile';
import Adzan from './pages/Adzan';
import Duas from './pages/Duas';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/surahs" element={<SurahList />} />
          <Route path="/surah/:id" element={<SurahReader />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/adzan" element={<Adzan />} />
          <Route path="/duas" element={<Duas />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
