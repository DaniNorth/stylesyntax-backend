// models/user.js
//User model with quiz results now reference instead of embedded


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
  bio: {
    type: String,
  },
  hashedPassword: {
    type: String,
    required: true,
    //TODO: Install BCRYPT to hash the passwords?
  },
  profileImg: {
    type: String,
    default: '',
  },
  pinnedOutfits: [{
    type: mongoose.Schema.Types.ObjectId,// User.findById(userId).populate('pinnedOutfits')
    ref: 'Outfit',
  }],
  folders: [{
    type: mongoose.Schema.Types.ObjectId,// User.findById(userId).populate('pinnedOutfits')
    ref: 'Folder',
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,// User.findById(userId).populate('followers')
    ref: 'User',
      //TODO: Follower Count?
      //TODO: How to handle duplicate followers?
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,// const user = await User.findById(userId).populate('following');
    ref: 'User',
    //TODO: Following Count?
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  quizResults: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizResults'
  }],  
  
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.set('toJSON', {
 transform: (document, returnedObject) => {
   delete returnedObject.hashedPassword;
   return returnedObject
 }
});


module.exports = mongoose.model('User', userSchema);