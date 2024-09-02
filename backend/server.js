import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js'; // Adjust path and extension
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js'; // Adjust path and extension
import mongoose from 'mongoose';
import authMiddleware from '../backend/middleware/authMiddleware.js';
import verifyAdmin from './middleware/verifyAdmin.js';
import quizRoutes from '../backend/routes/quizroutes.js';


dotenv.config();

const app = express();

// Use body-parser middleware
app.use(bodyParser.json()); // Parses JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies

// Use CORS middleware
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('your_mongodb_connection_string', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }).then(() => console.log('MongoDB connected'))
//     .catch((error) => console.error('MongoDB connection error:', error));
  

// Define Routes
app.use('/api/auth', authRoutes);
// app.use('/api/quiz', quizRoutes);
app.use('/admin', authMiddleware, verifyAdmin, quizRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
