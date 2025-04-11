// npm
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Import routers
const authRouter = require('./controllers/auth');
const testJwtRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const outfitsRouter = require('./controllers/outfits');
const foldersRouter = require('./controllers/folders');
const quizRouter = require('./controllers/quiz');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors({
  origin: 'https://stylesyntax.netlify.app/',
  credentials: true, 
}));
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/auth', authRouter);
app.use('/test-jwt', testJwtRouter);
app.use('/users', usersRouter);
app.use('/outfits', outfitsRouter);
app.use('/uploads', express.static('uploads'));
app.use('/folders', foldersRouter);
app.use('/quiz', quizRouter);

// Start the server and listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
