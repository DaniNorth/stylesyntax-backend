// user specific - hold many outfits- user can have many folders
const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    // The name of the folder (Spring Looks, Workwear)
  name: {
    type: String,
    required: true,
  },
    // The ID of the user who owns this folder
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Folder', folderSchema);