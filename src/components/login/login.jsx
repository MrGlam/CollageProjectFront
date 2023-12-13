import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../utils/authContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import a separate CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const handleLogin = async () => {
    console.log(username, password);
    try {
      // Send a POST request to your backend login endpoint
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Retrieve the token from the response
      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem('authToken', token);

      // Update the authentication status
      setIsAuthenticated(true);

      // Close the popup
      setShowPopup(false);

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      // Click occurred outside the popup, close it
      setShowPopup(false);
      navigate('/')
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
    <div>
      {showPopup && (
        <div className="popup">
          <div ref={popupRef} className="popup-content">
            <h2>Login</h2>
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
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
