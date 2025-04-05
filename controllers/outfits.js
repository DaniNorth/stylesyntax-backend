const express = require('express');
const verifyToken = require('../middleware/verify-token');
const Outfit = require('../models/outfit');
const router = express.Router();

// POST /outfits - CREATE Route "Protected"

router.post('/', verifyToken, async (req, res) => {
    try {
        // add the logged-in user's id to the author field
        req.body.author = req.user._id;
        const outfit = await Outfit.create(req.body);
        outfit._doc.author = req.user
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
router.put('/:outfitId', verifyToken, async (req, res) => {
    try {
        const outfit = await Outfit.findById(req.params.outfitId);
        // make sure request user and author are the same person
        if(!outfit.author.equals(req.user._id)) { // if there are NOT equal
            return res.status(403).send('You\'re not allowed to do that!');
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

        if(!outfit.author.equals(req.user._id)) {
            return res.status(403).send('You\'re not allowed to do that!');
        }

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
