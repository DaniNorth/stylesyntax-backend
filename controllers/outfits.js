const express = require('express');
const mongoose = require(`mongoose`);
const verifyToken = require('../middleware/verify-token');
const Outfit = require('../models/outfit');
const upload = require('../middleware/upload');
const router = express.Router();
const User = require('../models/user');
const Comment = require('../models/comment');
const cloudinary = require('cloudinary').v2;


// POST /outfits - CREATE Route "Protected"

router.post('/', verifyToken, upload.single('image'), async (req, res) => {
    try {
      req.body.author = req.user._id;
  
      if (req.file && req.file.path) {
        req.body.imageUrl = req.file.path;
      }
  
      const outfit = await Outfit.create(req.body);
      outfit._doc.author = req.user;
      res.status(201).json(outfit);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // GET /outfits - READ Route "Protected"

  router.get('/', verifyToken, async (req, res) => {
    try {
      const outfits = await Outfit.find({})
        .populate('author')
        .populate({
          path: 'comments',
          populate: { path: 'author' }
        })
        .sort({ createdAt: 'desc' });
      res.status(200).json(outfits);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

// GET /outfits/:outfitId - READ Route "Protected"
router.get('/:outfitId', verifyToken, async (req, res) => {
    try {
      const outfit = await Outfit.findById(req.params.outfitId)
        .populate('author');
  
      const comments = await Comment.find({ outfitId: outfit._id })
        .populate('author')
        .sort({ createdAt: -1 });
  
      res.status(200).json({ ...outfit._doc, comments });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

// PUT /outfits/:outfitId UPDATE Route "Protected"
router.put('/:outfitId', verifyToken, upload.single('image'), async (req, res) => {
    try {
      const outfit = await Outfit.findById(req.params.outfitId);  
        // make sure request user and author are the same person
        if (!outfit.author.equals(req.user._id)) { // if there are NOT equal
            return res.status(403).send('You\'re not allowed to do that!');
        }

        if (req.file && req.file.path) {
            req.body.imageUrl = req.file.path;
            // Delete the old image that was previously uploaded
            if (outfit.imageId) {
              try {
                await gfs.remove({ _id: outfit.imageId, root: 'uploads' });
              } catch (err) {
                console.log('Failed to delete old image:', err);
              }
            }
      
            // Give the new image an id 
            req.body.imageId = req.file.id;
            req.body.imageUrl = req.file.path;
        }

          const updatedOutfit = await Outfit.findByIdAndUpdate(
            req.params.outfitId,
            req.body,
            { new: true }
          );

        updatedOutfit._doc.author = req.user;
        res.status(200).json(updatedOutfit);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    });

// DELETE /outfits/:outfitId DELETE Route "Protected"

router.delete('/:outfitId', verifyToken, async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.outfitId);

    if (!outfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }

    if (!outfit.author.equals(req.user._id)) {
      return res.status(403).json({ error: "You're not allowed to delete this outfit" });
    }

    // Check to see if other users have this outfit saved (except for the user that uplaoded it)
    const usersWithThisOutfit = await User.find({
      pinnedOutfits: outfit._id,
      _id: { $ne: req.user._id },
    });

    if (usersWithThisOutfit.length > 0 && !req.user.isAdmin) {
      return res.status(403).json({
        error: 'This outfit is pinned by other users. Only an admin can delete it.'
      });
    }

    // Delete the outfit
    await Comment.deleteMany({ outfitId: outfit._id });
    const deletedOutfit = await Outfit.findByIdAndDelete(req.params.outfitId);
    res.status(200).json(deletedOutfit);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// POST /outfits/:outfitId/comments CREATE comment "protected"
router.post('/:outfitId/comments', verifyToken, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            author: req.user._id,
            outfitId: req.params.outfitId,
          });

          await Outfit.findByIdAndUpdate(req.params.outfitId, {
            $push: { comments: newComment._id }
          });
      
          await newComment.populate('author');
      
          res.status(201).json(newComment);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: error.message });
        }
      });

module.exports = router;
