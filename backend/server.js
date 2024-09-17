import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js'; // Adjust path and extension
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js'; // Adjust path and extension
import mongoose from 'mongoose';
import authMiddleware from './middleware/authMiddleware.js';
import verifyAdmin from './middleware/verifyAdmin.js';
import quizRoutes from './routes/quizroutes.js';
import path from 'path';
import resumeRoutes from './routes/resumeroutes.js'; // Import the resume routes
import { fileURLToPath } from 'url'; // New import for __dirname

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static files for uploaded resumes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/admin', authMiddleware, verifyAdmin, quizRoutes); // Admin routes (with auth)
app.use('/api', resumeRoutes); // Resume routes

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
