const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookmarks: [{
    surah: Number,
    ayah: Number,
    note: String,
  }],
  lastRead: {
    surah: Number,
    ayah: Number,
  },
  preferences: preferencesSchema,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 