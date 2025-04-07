const express = require('express');
const router = express.Router();

const User = require('../models/user');

const verifyToken = require('../middleware/verify-token');

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

module.exports = router;
