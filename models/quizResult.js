// models/quizResults.js
// Stores quiz results for each user (referenced in the User model)
const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Links to User
    ref: 'User',
    required: true,
    unique: true // One quiz result per user
  },

  genderCategory: {
    type: String,
    enum: ['Male', 'Female', 'Nonbinary'],
  },

  styleProfile: {
    type: String,
    enum: ['Boho', 'Minimalist', 'Grunge/edgy', 'Preppy', 'Streetwear', 'Classic', 'Casual', 'retro', 'Coder', 'Avant-Garde', 'ecclectic/artsy', 'other'],
  },

  lifestyleTags: [{
    type: String,
    enum: ['Athletic', 'Professional', 'Casual', 'Event-ready', 'Outdoorsy', 'Loungewear'],
  }],

  fitPreference: {
    type: String,
    enum: ['Fitted', 'Relaxed', 'Oversized'],
  },

  quizTakenAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('QuizResult', quizResultSchema);






