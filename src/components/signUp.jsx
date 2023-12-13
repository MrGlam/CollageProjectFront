import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      // Send a POST request to your backend signup endpoint
      const response = await axios.post('http://localhost:3001/auth/signup', {
        username,
        password,
      });

      // Optionally, handle the response from the backend (e.g., show a success message)
      console.log(response.data);
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      console.error('Signup failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
  );
};

export default Signup;
