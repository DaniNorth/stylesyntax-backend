const mongoose = require(`mongoose`);
const express = require('express');
const verifyToken = require('../middleware/verify-token');
const Outfit = require('../models/outfit');
const upload = require('../middleware/upload');
const router = express.Router();
const User = require('../models/user');

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  const Grid = require('gridfs-stream');
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// POST /outfits - CREATE Route "Protected"

router.post('/', verifyToken, upload.single('image'), async (req, res) => {
    try {
        // adds the logged-in user's id to the author field
        req.body.author = req.user._id;

        // Use saved GridFS file ID to outfit
        if (req.file) {
          req.body.imageId = req.file.id; 
        }

        const outfit = await Outfit.create(req.body);
        outfit._doc.author = req.user;
        res.status(201).json(outfit);
    } catch (error) {
        console.log(error); // TODO: remove this before prod
        res.status(500).json({ error: error.message });
    }
});


// GET /outfits - READ Route "Protected"
router.get('/', verifyToken, async (req, res) => {
    try {
        const outfits = await Outfit.find({})
        .populate('author')
        .sort({createdAt: 'desc'});
        res.status(200).json(outfits);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/images/:id', async (req, res) => {
    try {
      const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
  
      if (!file || !file.contentType.startsWith('image/')) {
        return res.status(404).json({ error: 'Not an image or not found' });
      }
  
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
  

// GET /outfits/:outfitId READ Route "Protected"
router.get('/:outfitId', verifyToken, async (req, res) => {
    try {
        const outfit = await Outfit.findById(req.params.outfitId)
        .populate(['author', 'comments.author']);
        res.status(200).json(outfit);
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
        if(!outfit.author.equals(req.user._id)) { // if there are NOT equal
            return res.status(403).send('You\'re not allowed to do that!');
        }

        if (req.file) {
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
          }

        const updatedOutfit = await Outfit.findByIdAndUpdate(
            req.params.outfitId,
            req.body,
            { new: true }
        );

        // {new: true } returns the document AFTER the update
        updatedOutfit._doc.author = req.user // a great alternative since we don't have .populate
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
      return res.status(403).json({ error: 'You\'re not allowed to delete this outfit' });
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

    // If there is an image uploaded delete that image from database
    if (outfit.imageId) {
      try {
        await gfs.remove({ _id: outfit.imageId, root: 'uploads' });
      } catch (err) {
        console.log('Failed to delete image from GridFS:', err);
      }
    }

    // Delete the outfit
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
        req.body.author = req.user._id; // adding requesting user as author
        const outfit = await Outfit.findById(req.params.outfitId);
        outfit.comments.push(req.body);
        await outfit.save();

        const newComment = outfit.comments[outfit.comments.length - 1]; // get most recent comment
        newComment._doc.author = req.user; // add requesting user's details

        res.status(201).json(newComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
