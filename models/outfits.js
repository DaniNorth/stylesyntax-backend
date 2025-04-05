const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: '',
  },

  imageUrl: {
    type: String,
    default: '',
  },

  tags: [String],              // e.g. ["Neutral", "Streetwear"]
  season: String,              // e.g. "Winter", "Spring"
  climateFit: String,          // e.g. "Tropical", "Cold"

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Outfit', outfitSchema);