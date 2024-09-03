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

// Fetch a specific card by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card || card.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a specific card by ID
router.put('/:id', protect, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card || card.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Update the card with new data
    Object.assign(card, req.body);

    const updatedCard = await card.save();
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
