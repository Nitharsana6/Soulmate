// models/Quiz.js
import mongoose from 'mongoose';

// Define the schema for quiz questions
const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the admin who created the question
    ref: 'User', // Assuming 'User' is your user model
    required: true,
  },
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
