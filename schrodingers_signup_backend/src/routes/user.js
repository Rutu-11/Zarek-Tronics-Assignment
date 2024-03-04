const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST route for user signup
router.post('/signup', async (req, res) => {
    console.log('req',req.body)
  try {
    const { name, email, password, course, session } = req?.body;
    const user = new User({ name, email, password, session, course });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;