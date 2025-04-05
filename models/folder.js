
// models/folder.js
// A folder (like a Pinterest board) that holds outfits for a specific user


const mongoose = require('mongoose');


const folderSchema = new mongoose.Schema({
 // The name of the folder (e.g., Vacation, Work, Favorites)
 name: {
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
 // thumbnail for the folder
 thumbnail: {
   type: String,
   default: ''
   // TODO: Auto-populate in 'addOutfitToFolder' controller from first outfit if none is set
 },


 // Privacy setting: true = private, false = public
 isPrivate: {
   type: Boolean,
   default: false //can change to true = private - toggle?
 }
}, { timestamps: true }); // Adds createdAt and updatedAt fields




module.exports = mongoose.model('Folder', folderSchema);
