// models/outfit.js
const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
  },

  description: {
    type: String,
    default: '',
  },

  styleProfile: {
    type: String,
    enum: ['Boho', 'Minimalist', 'Grunge', 'Preppy', 'Streetwear', 'Classic', 'Casual', 'Y2K', 'Chic', 'Other'],
  },

  lifestyleTags: [{
    type: String,
    enum: ['Athletic', 'Professional', 'Casual', 'Event-ready', 'Outdoorsy', 'Loungewear'],
  }],

  season: {
    type: String,
    enum: ['Winter', 'Spring', 'Summer', 'Fall'],
  },

  climateFit: {
    type: String,
    enum: ['Tropical', 'Temperate', 'Cold', 'Dry', 'Humid'],
  },

  fitPreference: {
    type: String,
    enum: ['Fitted', 'Relaxed', 'Oversized'],
  },

  genderCategory: {
    type: String,
    enum: ['Male', 'Female', 'Nonbinary', 'Unisex'],
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Outfit', outfitSchema);