const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');
const { offlineMode, onlineMode } = require('./src/utils/mode');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user');
const cors = require('cors');
const app = express();
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketio(server);


app.use(cors());
// Connect to MongoDB
// mongodb://localhost:27017/schrodingers_signup
// 
mongoose.connect('mongodb+srv://rutujadhekolkar97:PeLgJ7bjF07h3vz9@cluster0.mte1ope.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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



//rutujadhekolkar97,  QqWabG6JgEeVYFef

//rutujadhekolkar97, PeLgJ7bjF07h3vz9