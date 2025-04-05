//connects folders and outfits
const mongoose = require('mongoose');

// Define schema to connect a folder to an outfit
const folderOutfitSchema = new mongoose.Schema({
  // The folder this outfit is saved to
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder', 
    required: true,
  },

  // The outfit that was saved into the folder
  outfitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Outfit', // References the Outfit model
    required: true,
  }
});

module.exports = mongoose.model('FolderOutfit', folderOutfitSchema);