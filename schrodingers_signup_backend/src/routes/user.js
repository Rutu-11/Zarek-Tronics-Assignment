const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Import JWT
const bcrypt = require('bcrypt'); // Import bcrypt

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, DOB, Class, gender, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = new User({ firstName, lastName, email, password: hashedPassword, DOB, Class, gender, phoneNumber });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'secretKey12345', { expiresIn: '1h' }); // Generate JWT token
    res.status(200).json({ token });
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
