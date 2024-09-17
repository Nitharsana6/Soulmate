// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function Event() {
//     const [resumes, setResumes] = useState([]);

//     useEffect(() => {
//         // Fetch resumes from the backend when the component loads
//         const fetchResumes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/api/resumes'); // Adjust the API URL as needed
//                 setResumes(response.data);
//             } catch (error) {
//                 console.error('Error fetching resumes', error);
//             }
//         };

//         fetchResumes();
//     }, []);

//     return (
//         <div>
//             <h1>View Resumes</h1>
//             <ul>
//                 {resumes.map((resume, index) => (
//                     <li key={index}>
//                         {resume.originalname} - <a href={`http://localhost:3001/uploads/${resume.filename}`} target="_blank" rel="noopener noreferrer">Download</a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Event;


// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function Event() {
//     const [resumes, setResumes] = useState([]);
//     const [error, setError] = useState(null); // State for handling errors

//     useEffect(() => {
//         // Fetch resumes from the backend when the component loads
//         const fetchResumes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/api/resumes'); // API URL to fetch resumes
//                 setResumes(response.data);
//                 setError(null); // Clear any previous errors
//             } catch (error) {
//                 console.error('Error fetching resumes:', error);
//                 setError('Failed to load resumes. Please try again later.'); // Set error message
//             }
//         };

//         fetchResumes();
//     }, []);

//     return (
//         <div>
//             <h1>Admin Dashport</h1>
//             <h2>View Resume</h2>
//             {/* Display an error message if there's an error */}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
            
//             {/* Display resumes if available */}
//             {resumes.length > 0 ? (
//                 <ul>
//                     {resumes.map((resume, index) => (
//                         <li key={index}>
//                             {resume.originalname} - 
//                             <a href={`http://localhost:3001/uploads/${resume.filename}`} target="_blank" rel="noopener noreferrer"> Download</a>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 !error && <p>No resumes uploaded yet.</p>  // Display if no resumes and no error
//             )}
//         </div>
//     );
// }

// export default Event;

import { useEffect, useState } from 'react';
import axios from 'axios';
import './Events.css'; // Add styling if needed

function Event() {
    const [resumes, setResumes] = useState([]);
    const [error, setError] = useState(null); // State for handling errors

    useEffect(() => {
        // Fetch resumes from the backend when the component loads
        const fetchResumes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/resumes'); // API URL to fetch resumes
                setResumes(response.data);
                setError(null); // Clear any previous errors
            } catch (error) {
                console.error('Error fetching resumes:', error);
                setError('Failed to load resumes. Please try again later.'); // Set error message
            }
        };

        fetchResumes();
    }, []);

    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <h2>Admin Dashboard</h2>
                <ul className="sidebar-links">
                    <li><a href="#resume">Resumes</a></li>
                    <li><a href="#payment">Payment</a></li>
                    <li><a href="#jobs">Jobs</a></li>
                    <li><a href="#create-letter">Create Letter</a></li>
                </ul>
            </aside>

            <main className="dashboard-content">
                <section id="resume">
                    <h3>View Resumes</h3>

                    {/* Display an error message if there's an error */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    
                    {/* Display resumes if available */}
                    {resumes.length > 0 ? (
                        <ul className="resume-list">
                            {resumes.map((resume, index) => (
                                <li key={index}>
                                    {resume.originalname} - 
                                    <a 
                                        href={`http://localhost:3001/uploads/${resume.filename}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Download
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !error && <p>No resumes uploaded yet.</p>  // Display if no resumes and no error
                    )}
                </section>

                <section id="payment">
                    <h3>Payment Management</h3>
                    <p>Manage all payment-related information here.</p>
                </section>

                <section id="jobs">
                    <h3>Job Listings</h3>
                    <p>Manage job postings here.</p>
                </section>

                <section id="create-letter">
                    <h3>Create Letters</h3>
                    <p>Create and manage letters here.</p>
                </section>
            </main>
        </div>
    );
}

export default Event;

