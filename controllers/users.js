const express = require('express');
const router = express.Router();

const User = require('../models/user');

const verifyToken = require('../middleware/verify-token');

const upload = require('../middleware/upload');

router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, "username");

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:userId', verifyToken, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId){
      return res.status(403).json({ err: "Unauthorized"});
    }

    const user = await User.findById(req.params.userId)
      .populate('followers', 'username')
      .populate('following', 'username')
      .populate('pinnedOutfits')
      .populate({
        path: 'folders',
        populate: { path: 'outfits' }
      });

    if (!user) {
      return res.status(404).json({ err: 'User not found.'});
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//  Route so user can upload photos
router.post('/:userId/upload-profile-pic', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file.path;  

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { profileImg: imageUrl }, 
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
