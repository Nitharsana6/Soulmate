import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Ensure path is correct
import { validationResult } from 'express-validator';

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check if the user is an admin
    const isAdmin = user.role === 'admin'; // Adjust as per your needs

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        isAdmin, // Pass the admin status for frontend checks
      },
    };

    // Sign JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '100h' }, // Adjust as per security requirements
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: 'Signin Successfully', isAdmin });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Register User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
      role: 'user', // Default role, can be changed if needed
    });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save user to the database
    await newUser.save();

    // Create JWT payload
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    // Sign JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '100h' }, // Adjust as per security requirements
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: 'Successfully registered' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
