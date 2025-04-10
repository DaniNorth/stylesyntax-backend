const mongoose = require('mongoose');


const folderSchema = new mongoose.Schema({
  title: {
   type: String,
   required: true,
 },


  author: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   required: true,
 },


  outfits: [{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Outfit'
 }],

}, { timestamps: true }); 


module.exports = mongoose.model('Folder', folderSchema);
