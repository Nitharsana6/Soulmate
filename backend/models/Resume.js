import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
