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
 genderCategory: String, // (e.g. Male, Female, Nonbinary)
 styleProfile: String, // (e.g. Boho, Minimalist)
 lifestyleTags: [String], // (e.g. "athletic", "casual", "professional")
 climateRegion: String, // (e.g. temperate, tropical)
 seasonalPrefs: [String], // (e.g. summer, winter)
 fitPreference: String, // (e.g. fitted, oversized, relaxed)
 quizTakenAt: {
   type: Date,
   default: Date.now // The date and time the quiz was completed
 }
});


module.exports = mongoose.model('QuizResult', quizResultSchema);






