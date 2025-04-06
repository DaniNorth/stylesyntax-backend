const mongoose = require('mongoose');


const folderSchema = new mongoose.Schema({
 // The name of the folder (e.g., Vacation, Work, Favorites)
 title: {
   type: String,
   required: true,
 },


 // The user who owns this folder
 user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   required: true,
 },


 // Array of outfit IDs pinned in the folder
 outfits: [{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Outfit'
 }],

}, { timestamps: true }); // Adds createdAt and updatedAt fields


module.exports = mongoose.model('Folder', folderSchema);
