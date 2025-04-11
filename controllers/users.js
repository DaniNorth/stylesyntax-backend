const express = require('express');
const router = express.Router();

const User = require('../models/user');

const verifyToken = require('../middleware/verify-token');

const upload = require('../middleware/upload');

router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, "username profileImg followers");

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:userId', verifyToken, async (req, res) => {
  try {
    
      const user = await User.findById(req.params.userId)
      .populate('followers', 'username profileImg')
      .populate('following', 'username profileImg')
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

// FOLLOW a user
router.post('/:id/follow', verifyToken, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ err: 'User not found.' });
    }

    if (!userToFollow.followers.includes(currentUser._id)) {
      userToFollow.followers.push(currentUser._id);
      await userToFollow.save();
    }

    if (!currentUser.following.includes(userToFollow._id)) {
      currentUser.following.push(userToFollow._id);
      await currentUser.save();
    }

    const updatedUser = await User.findById(req.params.id).populate('followers', 'username profileImg');

    res.status(200).json({ 
      message: `You are now following ${userToFollow.username}`,
      updatedUser 
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// UNFOLLOW a user
router.post('/:id/unfollow', verifyToken, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ err: 'User not found.' });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(
      followerId => followerId.toString() !== currentUser._id.toString()
    );
    await userToUnfollow.save();

    currentUser.following = currentUser.following.filter(
      followId => followId.toString() !== userToUnfollow._id.toString()
    );
    await currentUser.save();

    const updatedUser = await User.findById(req.params.id).populate('followers', 'username profileImg');

    res.status(200).json({ 
      message: `You have unfollowed ${userToUnfollow.username}`,
      updatedUser 
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//  Route so user can upload photos
router.post('/:userId/upload-profile-pic', verifyToken, upload.single('image'), async (req, res) => {
  try {

    if(!req.file) {
      return res.status(400).json({ err: 'No file uploaded' })
    }

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

// PUT /user/:userId UPDATE Route "Protected"
router.put('/:userId', verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
});

// DELETE /user/:userId DELETE Route "Protected"
router.delete('/:userId', verifyToken, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json(deletedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
