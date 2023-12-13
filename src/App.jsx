// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import AuthRoute from './utils/authRoute';
import { AuthProvider } from './utils/authContext';
import Login from './components/login/login';
import Signup from './components/signUp/signUp';
import Dashboard from './components/dashboard/dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication on app startup
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const response = await axios.get('http://localhost:3001/auth/dashboard', {
        withCredentials: true,
        headers: {
          Authorization: `${token}`,
        },
      });

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  return (
    <Router>
      <AuthProvider>
        <div>
          <nav>
            <ul>

              {!isAuthenticated && (
              <><li>
                  <Link to="/login">Login</Link>
                </li><li>
                    <Link to="/signup">Sign Up</Link>
                  </li></>
              )}
              {isAuthenticated && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
            </ul>
          </nav>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route exact path='/dashboard' element={<AuthRoute/>}>
              <Route exact path='/dashboard' element={<Dashboard/>}/>
            </Route>
            
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
