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
    
  },
  profileImg: {
    type: String,
    default: '',
  },
  pinnedOutfits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Outfit',
  }],
  folders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
      
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  quizResults: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizResult'
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