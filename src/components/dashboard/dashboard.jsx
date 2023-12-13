import React from 'react';
import { useAuth } from '../../utils/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a POST request to your backend logout endpoint
      const response = await axios.post('http://localhost:3001/auth/logout');

      // Optionally, handle the response from the backend (e.g., display a success message)
      console.log(response.data);

      // Remove the token from localStorage on logout
      localStorage.removeItem('authToken');

      // Update the authentication status
      setIsAuthenticated(false);

      // Redirect to the login page after logout
      navigate('/');
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {isAuthenticated && (
        <button onClick={handleLogout}>Logout</button>
      )}
      {/* Display dashboard content here */}
    </div>
  );
};

export default Dashboard;
