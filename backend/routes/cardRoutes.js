const express = require('express');
const Card = require('../models/Card');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Add a new card
router.post('/', protect, async (req, res) => {
  try {
    const newCard = new Card({
      userId: req.user._id,
      ...req.body,
    });

    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(500).json({ message: 'Error saving card' });
  }
});

router.get('/', protect, async (req, res) => {
    try {
      const cards = await Card.find({ userId: req.user._id });
      res.json(cards);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
