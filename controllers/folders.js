const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');

const Folder = require('../models/folder');
const Outfit = require('../models/outfit');
const User = require('../models/user');


router.get('/', verifyToken, async (req, res) => {
  try {
    const folders = await Folder.find({ author: req.user._id }).populate('outfits');
    res.status(200).json(folders);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


router.get('/:id', verifyToken, async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id).populate('outfits');
    if (!folder || !folder.author.equals(req.user._id)) {
      return res.status(403).json({ err: 'Not authorized to view this folder' });
    }
    res.status(200).json(folder);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


router.post('/', verifyToken, async (req, res) => {
  try {
    const folder = await Folder.create({
      title: req.body.title,
      author: req.user._id,
      outfits: [],
    });

  
    await User.findByIdAndUpdate(req.user._id, {
      $push: { folders: folder._id },
    });

    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


router.patch('/:id', verifyToken, async (req, res) => {
    try {
      const folder = await Folder.findById(req.params.id);
  
      if (!folder || !folder.author.equals(req.user._id)) {
        return res.status(403).json({ err: 'Not authorized to edit this folder' });
      }
  
      folder.title = req.body.title || folder.title;
      await folder.save();
  
      res.status(200).json(folder);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });


router.patch('/:id/add-outfit', verifyToken, async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder || !folder.author.equals(req.user._id)) {
      return res.status(403).json({ err: 'Not authorized to modify this folder' });
    }

    const outfitId = req.body.outfitId;
    if (!folder.outfits.includes(outfitId)) {
      folder.outfits.push(outfitId);
      await folder.save();
    }

    const updatedFolder = await folder.populate('outfits');
    res.status(200).json(updatedFolder);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});



router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder || !folder.author.equals(req.user._id)) {
      return res.status(403).json({ err: 'Not authorized to delete this folder' });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { folders: folder._id },
    });

    await Folder.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Folder deleted' });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;