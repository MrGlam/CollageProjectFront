import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Signup.css'; // Import a separate CSS file for styling
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Validate username and password
      if (username.length < 5 || password.length < 5) {
        setError('Username and password must be at least 5 characters long.');
        return;
      }

      // Send a POST request to your backend signup endpoint
      const response = await axios.post('http://localhost:3001/auth/signup', {
        username,
        password,
      });

      // Optionally, handle the response from the backend (e.g., show a success message)
      console.log(response.data);

      // Close the signup popup
      setShowPopup(false);
      navigate('/login');
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during signup. Please try again.');
      }
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      // Click occurred outside the popup, close it
      setShowPopup(false);
      navigate('/');
    }
  };

  useEffect(() => {
    // Add event listener to handle clicks outside the popup
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="signup-popup">
      {showPopup && (
        <div className="signup-popup-content" ref={popupRef}>
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}
          <form>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="button" onClick={handleSignup}>
              Sign Up
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
