const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { theme } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 'preferences.theme': theme },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateLastRead = async (req, res) => {
  try {
    const { surah, ayah } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { lastRead: { surah, ayah } },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.addBookmark = async (req, res) => {
  try {
    const { surah, ayah, note } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { bookmarks: { surah, ayah, note } } },
      { new: true }
    ).select('-password');
    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.removeBookmark = async (req, res) => {
  try {
    const { surah, ayah } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { bookmarks: { surah, ayah } } },
      { new: true }
    ).select('-password');
    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 