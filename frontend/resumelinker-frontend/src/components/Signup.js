import React, { useState } from 'react';
import './Signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Registration successful!', {
                    style: {
                        backgroundColor: '#28a745', // Green background for success
                        color: 'white',
                    },
                });
                setMessage('Registration successful');
            } else {
                toast.error(data.message, {
                    style: {
                        backgroundColor: '#dc3545', // Red background for errors
                        color: 'white',
                    },
                });
                setMessage(data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.', {
                style: {
                    backgroundColor: '#dc3545', // Red background for errors
                    color: 'white',
                },
            });
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <p>{message}</p>
            <ToastContainer />
        </div>
    );
};

export default Signup;
