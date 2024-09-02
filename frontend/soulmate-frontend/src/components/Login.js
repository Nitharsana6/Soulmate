// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Login.css';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             const response = await axios.post('http://localhost:3001/api/auth/login', {
//                 email,
//                 password,
//             });

//             const data = response.data;

//             if (data.success) {
//                 toast.success('Login successful!', {
//                     style: {
//                         backgroundColor: 'white', // Green background for success
//                         color: 'black',
//                     },
//                 });
//                 // Perform additional actions on success, such as redirecting
//             } else {
//                 toast.error(data.message, {
//                     style: {
//                         backgroundColor: '#white', // Red background for errors
//                         color: 'black',
//                     },
//                 });
//             }
//         } catch (error) {
//             toast.error('An error occurred. Please try again later.', {
//                 style: {
//                     backgroundColor: '#dc3545', // Red background for errors
//                     color: 'white',
//                 },
//             });
//         }
//     };

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Email:</label>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <label>Password:</label>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             <p>Don't have an account? <Link to="/signup">Register Here</Link></p>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom'; // Added useNavigate for navigation
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Login.css';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate(); // Initialize navigate

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:3001/api/auth/login', {
//                 email,
//                 password,
//             });

//             const { token, message, isAdmin } = response.data;

//             if (response.status === 200) {
//                 toast.success(message || 'Login successful!', {
//                     style: {
//                         backgroundColor: 'white',
//                         color: 'black',
//                     },
//                 });

//                 // Store token in local storage
//                 localStorage.setItem('token', token);

//                 // Check if the logged-in user is an admin
//                 if (isAdmin) {
//                     navigate('/events'); // Redirect to Events.js page for admin
//                 } else {
//                     // Redirect to a different page if not an admin
//                     navigate('/home'); // Adjust path according to your needs
//                 }
//             } else {
//                 toast.error(message || 'Invalid Credentials', {
//                     style: {
//                         backgroundColor: '#dc3545',
//                         color: 'white',
//                     },
//                 });
//             }
//         } catch (error) {
//             toast.error('An error occurred. Please try again later.', {
//                 style: {
//                     backgroundColor: '#dc3545',
//                     color: 'white',
//                 },
//             });
//         }
//     };

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Email:</label>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <label>Password:</label>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             <p>Don't have an account? <Link to="/signup">Register Here</Link></p>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password,
            });

            const { token, message, isAdmin } = response.data;

            if (response.status === 200) {
                toast.success(message || 'Login successful!', {
                    style: {
                        backgroundColor: 'white',
                        color: 'black',
                    },
                });

                // Store token in local storage
                localStorage.setItem('token', token);

                // Check user role and navigate
                if (isAdmin) {
                    navigate('/events'); // Redirect to admin dashboard
                } else {
                    navigate('/quiz'); // Redirect to Quiz page for users
                }
            } else {
                toast.error(message || 'Invalid Credentials', {
                    style: {
                        backgroundColor: '#dc3545',
                        color: 'white',
                    },
                });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.', {
                style: {
                    backgroundColor: '#dc3545',
                    color: 'white',
                },
            });
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Register Here</Link></p>
            <ToastContainer />
        </div>
    );
};

export default Login;

