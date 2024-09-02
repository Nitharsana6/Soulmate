import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure usernames are unique if needed
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure emails are unique
    },
    password: {
        type: String,
        required: true
    },
    role: { // Add the colon here
        type: String,
        required: true,
        enum:['admin', 'user'],
        default:'user'
    }
});

export default mongoose.model('User', UserSchema);
