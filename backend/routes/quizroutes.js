// // routes/quizRoutes.js
// import express from 'express';
// import Quiz from '../models/Quiz.js';

// const router = express.Router();

// // Middleware to verify admin access (example placeholder)
// const verifyAdmin = (req, res, next) => {
//   console.log('req.user:', req.user); // Debugging line
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(403).json({ message: 'Admin access required' });
//   }
// };


// // Route to create quiz questions (Admin only)
// router.post('/create', verifyAdmin, async (req, res) => {
//   try {
//     const { questions, createdBy } = req.body;

//     // Check if 10 questions are provided
//     if (questions.length !== 10) {
//       return res.status(400).json({ message: 'Exactly 10 questions are required' });
//     }

//     // Save each question to the database
//     const quizQuestions = questions.map((question) => ({ question, createdBy }));
//     await Quiz.insertMany(quizQuestions);

//     res.status(201).json({ message: 'Quiz questions created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create quiz questions' });
//   }
// });

// // Route to get all quiz questions
// router.get('/all', async (req, res) => {
//   try {
//     const quizzes = await Quiz.find();
//     res.status(200).json(quizzes);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch quiz questions' });
//   }
// });

// // Route to update a quiz question (Admin only)
// router.put('/update/:id', verifyAdmin, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { question } = req.body;

//     const updatedQuiz = await Quiz.findByIdAndUpdate(id, { question }, { new: true });

//     if (!updatedQuiz) {
//       return res.status(404).json({ message: 'Quiz question not found' });
//     }

//     res.status(200).json({ message: 'Quiz question updated successfully', updatedQuiz });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update quiz question' });
//   }
// });

// // Route to delete a quiz question (Admin only)
// router.delete('/delete/:id', verifyAdmin, async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedQuiz = await Quiz.findByIdAndDelete(id);

//     if (!deletedQuiz) {
//       return res.status(404).json({ message: 'Quiz question not found' });
//     }

//     res.status(200).json({ message: 'Quiz question deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete quiz question' });
//   }
// });

// export default router;

import express from 'express';
import Quiz from '../models/Quiz.js';
import verifyAdmin from '../middleware/verifyAdmin.js';

const router = express.Router();

// Middleware to verify admin access (example placeholder)

// Route to create quiz questions (Admin only)
router.post('/create', verifyAdmin, async (req, res) => {
  try {
    const { questions, createdBy } = req.body;

    // Check if 10 questions are provided
    if (questions.length !== 10) {
      return res.status(400).json({ message: 'Exactly 10 questions are required' });
    }

    // Save each question to the database
    const quizQuestions = questions.map((question) => ({ question, createdBy }));
    await Quiz.insertMany(quizQuestions);

    res.status(201).json({ message: 'Quiz questions created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz questions' });
  }
});

// Route to get all quiz questions
router.get('/all', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz questions' });
  }
});

// Route to update a quiz question (Admin only)
router.put('/update/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { question } = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(id, { question }, { new: true });

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz question not found' });
    }

    res.status(200).json({ message: 'Quiz question updated successfully', updatedQuiz });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz question' });
  }
});

// Route to delete a quiz question (Admin only)
router.delete('/delete/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuiz = await Quiz.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz question not found' });
    }

    res.status(200).json({ message: 'Quiz question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz question' });
  }
});

export default router;

