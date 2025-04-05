// models/user.js - w/quiz results
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    default: '',
  },
  pinnedOutfits: [{
    type: mongoose.Schema.Types.ObjectId,// use .populate() to get outfit details
    ref: 'Outfit',
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,// use .populate() to get follower details
    ref: 'User',
  }],

  following: [{
    type: mongoose.Schema.Types.ObjectId,// use .populate() to get following details
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //embedded quiz results
  genderCategory: String,
  styleProfile: String,
  lifestyleTags: [String],
  climateRegion: String,
  seasonalPrefs: [String],
  fitPreference: String,
  quizTakenAt: Date

});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
    return returnedObject
  }
});

module.exports = mongoose.model('User', userSchema);
