const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Import JWT
const bcrypt = require('bcrypt'); // Import bcrypt
const app = express();

require('dotenv').config();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Socket.io for offline/online detection
io.on('connection', socket => {
  console.log('New connection');
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

// Routes
app.use('/api/user', userRoutes);
app.get('/health', (req, res) => {
  res.send('OK');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
