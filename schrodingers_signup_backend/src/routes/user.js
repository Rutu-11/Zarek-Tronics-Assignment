const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST route for user signup
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, DOB,Class, gender, phoneNumber } = req?.body;
    const user = new User({ firstName, lastName, email, password, DOB,Class, gender, phoneNumber });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async(req,res)=>{
  try {
    const users = await User.find();

    // Return the list of users
    res.status(200).json(users);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;
