
// import React, { useRef, useState } from 'react';
// import './Home.css'; // Ensure you have the appropriate styling in Home.css
// import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
// import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
// import logoimg from '/home/uki-jaffna/Documents/SOULMATE/frontend/resumelinker-frontend/src/components/logo.webp'; // Update path as needed

// const Home = () => {
//   const [selectedFile, setSelectedFile] = useState(null); // State to manage selected file
//   const fileInputRef = useRef(null);

//   // Handle file input click
//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   // Handle file selection
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file); // Set the selected file in the state
//       toast.success(`File selected: ${file.name}`, {
//         style: {
//           backgroundColor: 'white',
//           color: 'black',
//         },
//       }); // Display a success toast
//       console.log('File selected:', file.name); // Log the selected file name
//       // Here you can add code to upload the file to your backend
//     }
//   };

//   return (
//     <div className="home">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">
//           <img 
//             src={logoimg} 
//             alt="Logo" 
//             style={{ width: '80px', height: 'auto' }} // Adjust the width as needed
//           />
//         </div>
//         <ul className="nav-links">
//           <li><a href="#create-resume">Create Resume</a></li>
//           <li><a href="#create-cover-letter">Cover Letter</a></li>
//           <li><a href="#paying">Paying</a></li>
//           <button><li><a href="/Login">Login</a></li></button>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <main className="content">
//         <section className="main-section">
//           <div className="left-section">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/7112/7112221.png" // Placeholder image URL
//               alt="Resume Preview"
//               style={{ width: '200px', height: 'auto' }}
//               className="resume-image1"
//             />
//             {/* Upload Button */}
//             <button className="upload-btn" onClick={handleUploadClick}>
//               Upload your Resume
//             </button>
//             {/* Hidden File Input */}
//             <input
//               type="file"
//               ref={fileInputRef}
//               style={{ display: 'none' }}
//               onChange={handleFileChange}
//               accept=".pdf,.doc,.docx"
//             />
//             {/* Display selected file name */}
//             {selectedFile && <p>Selected File: {selectedFile.name}</p>}
//           </div>
//           <div className="right-section">
//             <img
//               src="https://media.licdn.com/dms/image/D5612AQGH8RN2hZCltg/article-cover_image-shrink_600_2000/0/1716131024845?e=2147483647&v=beta&t=JDfSf6LLCy1FIQkb-JNEPmNjLJxqjvyFJ_px-5LJ_Bs" // Placeholder image URL
//               alt="Resume Preview"
//               style={{ width: '600px', height: 'auto' }}
//               className="resume-image"
//             />
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="footer">
//         <p>© 2024 ResumeLinker. All rights reserved.</p>
//       </footer>
//       {/* Toast Container for notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Home;


import React, { useRef, useState } from 'react';
import './Home.css'; // Ensure you have the appropriate styling in Home.css
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import axios from 'axios'; // Axios for making HTTP requests
import logoimg from '/home/uki-jaffna/Documents/SOULMATE/frontend/resumelinker-frontend/src/components/logo.webp'; // Update path as needed

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State to manage selected file
  const fileInputRef = useRef(null);

  // Handle file input click
  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input when button is clicked
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Set the selected file in the state
      toast.success(`File selected: ${file.name}`, {
        style: {
          backgroundColor: 'white',
          color: 'black',
        },
      });
  
      // Create FormData object and append the file
      const formData = new FormData();
      formData.append('resume', file);
  
      try {
        // Send POST request to upload the file immediately
        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Check if response is ok
        if (response.status === 200) {
          toast.success(response.data.message, {
            style: {
              backgroundColor: 'white',
              color: 'black',
            },
          });
        } else {
          throw new Error('Failed to upload');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error(`Error: ${error.response?.data?.message || 'Error uploading resume!'}`, {
          style: {
            backgroundColor: 'white',
            color: 'black',
          },
        });
      }
    }
  };
  
  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img 
            src={logoimg} 
            alt="Logo" 
            style={{ width: '80px', height: 'auto' }} // Adjust the width as needed
          />
        </div>
        <ul className="nav-links">
          <li><a href="#create-resume">Create Resume</a></li>
          <li><a href="#create-cover-letter">Cover Letter</a></li>
          <li><a href="#paying">Paying</a></li>
          <button><li><a href="/Login">Login</a></li></button>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="content">
      
        <section className="main-section">
          
          <div className="left-section">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7112/7112221.png" // Placeholder image URL
              alt="Resume Preview"
              style={{ width: '200px', height: 'auto' }}
              className="resume-image1"
            />
            {/* Upload Button */}
            <button className="upload-btn" onClick={handleUploadClick}>
              Upload your Resume
            </button>
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
            {/* Display selected file name */}
            {selectedFile && <p>Selected File: {selectedFile.name}</p>}
          </div>
          <div className="right-section">
            <img
              src="https://media.licdn.com/dms/image/D5612AQGH8RN2hZCltg/article-cover_image-shrink_600_2000/0/1716131024845?e=2147483647&v=beta&t=JDfSf6LLCy1FIQkb-JNEPmNjLJxqjvyFJ_px-5LJ_Bs" // Placeholder image URL
              alt="Resume Preview"
              style={{ width: '600px', height: 'auto' }}
              className="resume-image"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 ResumeLinker. All rights reserved.</p>
      </footer>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Home;
