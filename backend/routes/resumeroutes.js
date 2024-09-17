// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import Resume from '../models/Resume.js'; // Make sure .js is added here

// const router = express.Router();

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Path should be relative to the root of your project
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage });




// // Route to upload resumes
// router.post('/upload', upload.single('Resume'), async (req, res) => {
//     try {
//         const newResume = new Resume({
//             filename: req.file.filename,
//             originalname: req.file.originalname,
//         });
//         await newResume.save();
//         res.status(200).json({ message: 'Resume uploaded successfully!' });
//         console.log('Resume uploaded successfully!')
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to upload resume' });
//     }
// });

// // Route to view uploaded resumes (for admin panel)
// router.get('/Resumes', async (req, res) => {
//     try {
//         const resumes = await Resume.find();
//         res.status(200).json(resumes);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch resumes' });
//     }
// });

// // ES Module export syntax
// export default router;


// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import Resume from '../models/Resume.js'; // Ensure .js extension is included for ES modules

// const router = express.Router();

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Ensure the 'uploads/' folder exists
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Unique filename
//     }
// });

// const upload = multer({ storage });

// // Route to upload resumes
// router.post('/upload', upload.single('resume'), async (req, res) => {
//     try {
//         // Check if a file is uploaded
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const newResume = new Resume({
//             filename: req.file.filename,
//             originalname: req.file.originalname,
//         });
//         await newResume.save();
//         res.status(200).json({ message: 'Resume uploaded successfully!' });
//         console.log('Resume uploaded successfully!');
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to upload resume' });
//     }
// });

// // Route to view uploaded resumes (for admin panel)
// router.get('/resumes', async (req, res) => {
//     try {
//         const resumes = await Resume.find();
//         res.status(200).json(resumes);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch resumes' });
//     }
// });

// export default router;


import express from 'express';
import multer from 'multer';
import path from 'path';
import Resume from '../models/Resume.js';
import fs from 'fs';

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// File type filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter,
});

// Route to upload resumes
router.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const newResume = new Resume({
            filename: req.file.filename,
            originalname: req.file.originalname,
        });
        await newResume.save();
        res.status(200).json({ message: 'Resume uploaded successfully!' });
        console.log('Resume uploaded successfully!');
    } catch (error) {
        console.error('Error uploading resume:', error);
        res.status(500).json({ error: 'Failed to upload resume' });
    }
});

// Route to view uploaded resumes (for admin panel)
router.get('/resumes', async (req, res) => {
    try {
        const resumes = await Resume.find();
        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resumes' });
    }
});

// Serve uploaded files
router.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

export default router;

