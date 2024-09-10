const express = require('express');
const Organ = require('../models/Organ');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const organs = await Organ.find();
    res.json(organs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
